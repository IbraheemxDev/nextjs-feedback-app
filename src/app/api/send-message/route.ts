import dbConnect from "@/lib/dbConnect";
import UserModel, { Message } from "@/model/User";

import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/utils/ApiResponse";

export async function POST(request: NextRequest) {
  // Connect to MongoDB
  await dbConnect();

  try {
    // Get request body
    const { username, content } = await request.json();

    // Find user by username
    const user = await UserModel.findOne({ username });

    // User not found
    if (!user) {
      return NextResponse.json(
        new ApiResponse(
          404,
          "User not found"
        ),
        {
          status: 404,
        }
      );
    }

    // Check if user is accepting messages
    if (!user.isAcceptingMessage) {
      return NextResponse.json(
        new ApiResponse(
          403,
          "User is not accepting messages"
        ),
        {
          status: 403,
        }
      );
    }

    // Create new message
    const newMessage = {
      content,
      createdAt: new Date(),
    };

    // Add message to user's messages array
    user.messages.push(newMessage as Message);

    // Save updated user
    await user.save();

    // Success response
    return NextResponse.json(
      new ApiResponse(
        200,
        "Message sent successfully"
      ),
      {
        status: 200,
      }
    );

  } catch (error) {
    // Log unexpected server errors
    console.error(
      "Error sending message:",
      error
    );

    return NextResponse.json(
      new ApiResponse(
        500,
        "Error sending message"
      ),
      {
        status: 500,
      }
    );
  }
}