import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/utils/ApiResponse";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: NextRequest) {
  // Connect to MongoDB
  await dbConnect();
  try {
    // Get data from request body
    const { username, email, password } = await request.json();

    // fixed: removed "isVerified: true" filter.
    // Reason: this only blocked the username if a VERIFIED user had it.
    // If the username existed but was unverified (from an incomplete/old signup
    // attempt with a DIFFERENT email), this check returned null, both guard
    // clauses passed, and the code fell into the "else" branch trying to
    // create a brand new user with the same username -> MongoDB unique index
    // (username_1) threw E11000 duplicate key error on newUser.save().
    const existingUserByUsername = await UserModel.findOne({ username });

    if (existingUserByUsername) {
      // fixed: only block if it's actually a different account.
      // If the SAME email is re-attempting signup with the same username,
      // let it fall through to the "existingUserByEmail" update logic below.
      if (existingUserByUsername.email !== email) {
        return NextResponse.json(
          new ApiResponse(400, "Username is already taken"),
          { status: 400 }
        );
      }
    }

    // Check if a user already exists with this email
    const existingUserByEmail = await UserModel.findOne({
      email,
    });

    // Generate 6-digit verification code
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    if (existingUserByEmail) {
      // If email is already verified, don't allow registration
      if (existingUserByEmail.isVerified) {
        return NextResponse.json(
          new ApiResponse(400, "User already exists with this email"),
          { status: 400 }
        );
      }
      // Update existing unverified user
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUserByEmail.username = username; // added: keep username in sync too, in case user changed it on resubmit
      existingUserByEmail.password = hashedPassword;
      existingUserByEmail.verifyCode = verifyCode;
      existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
      await existingUserByEmail.save();
    } else {
      // Hash password before saving
      const hashedPassword = await bcrypt.hash(password, 10);
      // Verification code expiry (1 hour)
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      // Create new user
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isVerified: false,
        isAcceptingMessage: true,
        messages: [],
      });
      await newUser.save();
    }

    // Send verification email
    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    // If email sending fails
    if (!emailResponse.success) {
      return NextResponse.json(
        new ApiResponse(500, emailResponse.message),
        {
          status: 500,
        }
      );
    }

    // Registration successful
    return NextResponse.json(
      new ApiResponse(
        201,
        "User registered successfully. Please verify your email."
      ),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    // Internal server error
    return NextResponse.json(new ApiResponse(500, "Error registering user"), {
      status: 500,
    });
  }
}