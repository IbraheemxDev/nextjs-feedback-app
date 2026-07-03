import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { z } from "zod";
import { usernameValidation } from "@/schemas/signUpSchema";
import { NextRequest, NextResponse } from "next/server";
import { ApiResponse } from "@/utils/ApiResponse";

// Zod schema to validate username query parameter
const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: NextRequest) {
  // Connect to MongoDB
  await dbConnect();

  try {
    // Extract query parameters from the request URL
    const { searchParams } = new URL(request.url);

    const queryParam = {
      // Get username from URL
      // Example: /api/check-username-unique?username=ibraheem
      username: searchParams.get("username"),
    };

    // Validate query parameter using Zod
    const result = UsernameQuerySchema.safeParse(queryParam);

    // Return validation errors if username is invalid
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];

      return NextResponse.json(
        new ApiResponse(
          400,
          usernameErrors.length > 0
            ? usernameErrors.join(", ")
            : "Invalid query parameters"
        ),
        { status: 400 }
      );
    }

    // Extract validated username
    const { username } = result.data;

    // Check if a verified user already exists with this username
    const existingVerifiedUsser =await  UserModel.findOne({
      username,
      isVerified: true,
    });

    // Username already exists
    if (existingVerifiedUsser) {
      return NextResponse.json(
        new ApiResponse(
          400,
          "Username is already taken"
        ),
        { status: 400 }
      );
    }

    // Username is available
    return NextResponse.json(
      new ApiResponse(
        200,
        "Username is unique"
      ),
      { status: 200 }
    );

  } catch (error) {
    // Log unexpected server errors
    console.error("Error checking username:", error);

    return NextResponse.json(
      new ApiResponse(
        500,
        "Error checking username"
      ),
      { status: 500 }
    );
  }
}