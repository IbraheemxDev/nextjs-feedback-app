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

    // Check if a verified user already exists with the same username
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingUserVerifiedByUsername) {
      return NextResponse.json(
        new ApiResponse(400, "Username is already taken"),
        { status: 400 }
      );
    }

    // Check if a user already exists with this email
    const existingUserByEmail = await UserModel.findOne({
      email,
    });

    // Generate 6-digit verification code
    const verifyCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

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

      existingUserByEmail.password = hashedPassword;
      existingUserByEmail.verifyCode = verifyCode;
      existingUserByEmail.verifyCodeExpiry = new Date(
        Date.now() + 3600000
      );

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
       new ApiResponse(
          500,
         emailResponse.message
         ),
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
    return NextResponse.json(
      new ApiResponse(
        500,
        "Error registering user"
      ),
      {
        status: 500,
      }
    );
  }
}