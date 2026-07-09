"use client";
import { ApiResponse as ApiResponseClass } from "@/utils/ApiResponse";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Loader2, Send, Sparkles } from "lucide-react";

import { messageSchema } from "@/schemas/messageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type MessageFormData = z.infer<typeof messageSchema>;

// NOTE: the /api/suggest-messages route uses a separate ApiResponse class
// (from "@/utils/ApiResponse") that returns a `data` field, e.g.
// { success, message, data: string[] }. If your class shapes it
// differently (e.g. "messages" instead of "data"), adjust the
// `suggestions = response.data.data` line below to match.

function PublicMessagePage() {
  const params = useParams<{ username: string }>();
  const username = params.username;

  const [isSending, setIsSending] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const form = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });
  const { register, handleSubmit, setValue, watch, reset } = form;
  const content = watch("content");

  // Send the anonymous message to this user
  const onSubmit = async (data: MessageFormData) => {
    setIsSending(true);
    try {
      const response = await axios.post<ApiResponse>("/api/send-message", {
        username,
        content: data.content,
      });
      toast.success("Message Sent", {
        description: response.data.message,
      });
      reset();
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description:
          axiosError.response?.data?.message ?? "Failed to send message",
      });
    } finally {
      setIsSending(false);
    }
  };

  // Fetch AI-generated message ideas
  const fetchSuggestions = async () => {
    setIsSuggesting(true);
    try {
      const response = await axios.post<ApiResponseClass<string[]>>("/api/suggest-messages");

      const suggested: string[] = response.data.data ?? [];
      setSuggestions(suggested);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponseClass<string[]>>;
      toast.error("Error", {
        description:
          axiosError.response?.data?.message ??
          "Failed to load suggestions",
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  // Clicking a suggestion drops it straight into the textarea
  const handleSuggestionClick = (suggestion: string) => {
    setValue("content", suggestion, { shouldValidate: true });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Send an Anonymous Message
          </h1>
          <p className="text-slate-400 mt-2">
            to <span className="text-indigo-400 font-medium">@{username}</span>
          </p>
        </div>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Textarea
                  {...register("content")}
                  placeholder="Write your anonymous message here..."
                  className="min-h-[120px] bg-slate-950 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-indigo-600 resize-none"
                />
                <div className="flex justify-between items-center mt-1">
                  {form.formState.errors.content ? (
                    <p className="text-sm text-red-400">
                      {form.formState.errors.content.message}
                    </p>
                  ) : (
                    <span />
                  )}
                  <span className="text-xs text-slate-500">
                    {content?.length ?? 0}/300
                  </span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSending}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                {isSending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Send className="h-4 w-4 mr-2" />
                )}
                Send Message
              </Button>
            </form>

            <Separator className="my-6 bg-slate-800" />

            <div>
              <Button
                type="button"
                variant="outline"
                onClick={fetchSuggestions}
                disabled={isSuggesting}
                className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                {isSuggesting ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Sparkles className="h-4 w-4 mr-2" />
                )}
                Suggest Messages
              </Button>

              {suggestions.length > 0 && (
                <div className="mt-4 space-y-2">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left text-sm text-slate-300 bg-slate-950 border border-slate-800 rounded-md px-4 py-3 hover:border-indigo-600 hover:text-white transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default PublicMessagePage;