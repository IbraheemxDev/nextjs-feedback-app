import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { NextRequest, NextResponse } from "next/server";

import { verifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/utils/ApiResponse";

export async function POST(request: NextRequest) {
  // Connect to MongoDB
  await dbConnect();

  try {
    // Get request body
    const body = await request.json();

    // Validate request body using Zod
    const result = verifySchema.safeParse(body);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;

      return NextResponse.json(
        new ApiResponse(
          400,
          Object.values(errors).flat().join(", ")
        ),
        { status: 400 }
      );
    }

    // Extract validated data
    const { username, code } = result.data;

    // Decode username (if URL encoded)
    const decodedUsername = decodeURIComponent(username);

    // Find user by username
    const user = await UserModel.findOne({
      username: decodedUsername,
    });

    // User does not exist
    if (!user) {
      return NextResponse.json(
        new ApiResponse(
          404,
          "User not found"
        ),
        { status: 404 }
      );
    }

    // Check verification code
    const isCodeValid = user.verifyCode === code;

    // Check expiry
    const isCodeNotExpired =
      new Date(user.verifyCodeExpiry) > new Date();

    // Verification successful
    if (isCodeValid && isCodeNotExpired) {
      user.isVerified = true;
      // user.verifyCode = "";

      await user.save();

      return NextResponse.json(
        new ApiResponse(
          200,
          "Account verified successfully"
        ),
        { status: 200 }
      );
    }

    // Verification code expired
    if (!isCodeNotExpired) {
      return NextResponse.json(
        new ApiResponse(
          400,
          "Verification code has expired. Please sign up again to get a new code."
        ),
        { status: 400 }
      );
    }

    // Verification code is incorrect
    return NextResponse.json(
      new ApiResponse(
        400,
        "Invalid verification code"
      ),
      { status: 400 }
    );

  } catch (error) {
    console.error("Error verifying user:", error);

    return NextResponse.json(
      new ApiResponse(
        500,
        "Error verifying user"
      ),
      { status: 500 }
    );
  }
}