import { NextRequest, NextResponse } from "next/server";

import { getSuggestedMessages } from "@/lib/ai/services";
import { ApiResponse } from "@/utils/ApiResponse";

export async function POST(request: NextRequest) {
  try {
    const result = await getSuggestedMessages();

    return NextResponse.json(
      new ApiResponse(
        result.statusCode,
        result.message,
        result.data
      ),
      {
        status: result.statusCode,
      }
    );

  } catch (error) {
    console.error(
      "Route Error:",
      error
    );

    return NextResponse.json(
      new ApiResponse(
        500,
        "Internal Server Error"
      ),
      {
        status: 500,
      }
    );
  }
}