import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

import { User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/utils/ApiResponse";
import mongoose from "mongoose";

export async function GET(request: NextRequest) {
  // Connect to MongoDB
  await dbConnect();

  try {
    // Get logged-in user's session
    const session = await getServerSession(authOptions);

    // Check if user is authenticated
    if (!session || !session.user) {
      return NextResponse.json(new ApiResponse(401, "Not Authenticated"), {
        status: 401,
      });
    }

    // Extract logged-in user
    const user = session.user as User;

    // Convert user id into MongoDB ObjectId
    const userId = new mongoose.Types.ObjectId(user._id);

    // fixed: first confirm the user actually exists, separately from whether
    // they have any messages — these were previously conflated
    const userExists = await UserModel.exists({ _id: userId });
    if (!userExists) {
      return NextResponse.json(new ApiResponse(404, "User not found"), {
        status: 404,
      });
    }

    // Aggregate pipeline to fetch all messages
    const foundUser = await UserModel.aggregate([
      // Match the logged-in user
      {
        $match: {
          _id: userId,
        },
      },

      // Convert messages array into individual documents
      // fixed: preserveNullAndEmptyArrays so users with 0 messages aren't
      // dropped entirely by $unwind (which previously made them look "not found")
      {
        $unwind: {
          path: "$messages",
          preserveNullAndEmptyArrays: true,
        },
      },

      // Sort messages by latest first
      {
        $sort: {
          "messages.createdAt": -1,
        },
      },

      // Group messages back into an array
      {
        $group: {
          _id: "$_id",
          messages: {
            $push: "$messages",
          },
        },
      },
    ]);

    // fixed: with preserveNullAndEmptyArrays, a user with zero messages ends
    // up with messages: [null] instead of []  — clean that up
    const messages = (foundUser[0]?.messages ?? []).filter(Boolean);

    // Return user's messages (empty array if they have none)
    return NextResponse.json(
      new ApiResponse(200, "Messages fetched successfully", {
        messages,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    // Log unexpected server errors
    console.error("Error fetching messages:", error);

    return NextResponse.json(new ApiResponse(500, "Error fetching messages"), {
      status: 500,
    });
  }
}       