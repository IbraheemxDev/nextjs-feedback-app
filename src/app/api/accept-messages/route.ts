import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

import { User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/utils/ApiResponse";

export async function POST(request: NextRequest) {
  // Connect to MongoDB
  await dbConnect();

  // Get logged-in user session
  const session = await getServerSession(authOptions);

  // User is not authenticated
  if (!session || !session.user) {
    return NextResponse.json(
      new ApiResponse(
        401,
        "Not Authenticated"
      ),
      { status: 401 }
    );
  }

  // Extract user from session
  const user = session.user as User;

  // Logged-in user's id
  const userId = user._id;

  // Get request body
  const { acceptMessages } = await request.json();

  try {
    // Update message acceptance status
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        isAcceptingMessage: acceptMessages,
      },
      {
        new: true,
      }
    );

    // User not found
    if (!updatedUser) {
      return NextResponse.json(
        new ApiResponse(
          404,
          "Failed to update user status to accept messages"
        ),
        {
          status: 404,
        }
      );
    }

    // Successfully updated
    return NextResponse.json(
      new ApiResponse(
        200,
        "Message acceptance status updated successfully",
        updatedUser
      ),
      {
        status: 200,
      }
    );

  } catch (error) {
    console.error(
      "Failed to update user status:",
      error
    );

    return NextResponse.json(
      new ApiResponse(
        500,
        "Failed to update user status to accept messages"
      ),
      {
        status: 500,
      }
    );
  }
}


export async function GET(request: NextRequest) {
  // Connect to MongoDB
  await dbConnect();

  try {
    // Get logged-in user session
    const session = await getServerSession(authOptions);

    // User is not authenticated
    if (!session || !session.user) {
      return NextResponse.json(
        new ApiResponse(
          401,
          "Not Authenticated"
        ),
        { status: 401 }
      );
    }

    // Extract user from session
    const user = session.user as User;

    // Logged-in user's id
    const userId = user._id;

    // Find logged-in user
    const foundUser = await UserModel.findById(userId);

    // User not found
    if (!foundUser) {
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

    // Return current message acceptance status
    return NextResponse.json(
      new ApiResponse(
        200,
        "User message acceptance status fetched successfully",
        {
          isAcceptingMessages: foundUser.isAcceptingMessage,
        }
      ),
      {
        status: 200,
      }
    );
  } catch (error) {
    // Log unexpected server errors
    console.error(
      "Error fetching message acceptance status:",
      error
    );

    return NextResponse.json(
      new ApiResponse(
        500,
        "Error fetching message acceptance status"
      ),
      {
        status: 500,
      }
    );
  }
}