import { z } from "zod";

export const suggestedMessagesSchema = z.object({
  messages: z
    .array(z.string())
    .length(5, "Exactly 5 messages are required"),
});