import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

import { User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { ApiResponse } from "@/utils/ApiResponse";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ messageid: string }> }, // fixed: params is now a Promise in this Next.js version
) {
  // Connect to MongoDB
  await dbConnect();

  const { messageid: messageId } = await params; // fixed: must await params before reading properties

  // Get logged-in user's session
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json(new ApiResponse(401, "Not Authenticated"), {
      status: 401,
    });
  }
  const user = session?.user as User;
  try {
    const updateResult = await UserModel.updateOne(
      {
        _id: user._id,
      },
      { $pull: { messages: { _id: messageId } } },
    );
    if (updateResult.modifiedCount == 0) {
      return NextResponse.json(
        new ApiResponse(401, "Message not found or already deleted"),
        {
          status: 401,
        },
      );
    }
    return NextResponse.json(new ApiResponse(200, "Message Deleted"), {
      status: 200,
    });
  } catch (error: any) {
    console.log("error in delete message route", error);
    return NextResponse.json(new ApiResponse(500, "Error deleting message"), {
      status: 500,
    });
  }
}