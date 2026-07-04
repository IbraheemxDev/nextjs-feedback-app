import { google } from "@ai-sdk/google";
import { generateObject } from "ai";

import { ApiResponse } from "@/utils/ApiResponse";

import { SUGGEST_MESSAGES_PROMPT } from "./prompt";
import { suggestedMessagesSchema } from "@/schemas/suggestMessageSchema";

export async function getSuggestedMessages(): Promise<ApiResponse<string[]>> {
  try {
    // Check API key
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return new ApiResponse(
        500,
        "Google AI API key is not configured"
      );
    }

    // Generate structured response
    const { object } = await generateObject({
      model: google("gemini-2.5-flash"),
      schema: suggestedMessagesSchema,
      prompt: SUGGEST_MESSAGES_PROMPT,
    });

    return new ApiResponse(
      200,
      "Suggested messages generated successfully",
      object.messages
    );

  } catch (error) {
    console.error(
      "Error generating suggested messages:",
      error
    );

    return new ApiResponse(
      503,
      "AI service is currently unavailable"
    );
  }
}