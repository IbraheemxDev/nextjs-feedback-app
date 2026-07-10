"use client";
import { ApiResponse as ApiResponseClass } from "@/utils/ApiResponse";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, Send, Sparkles, MessageCircleMore } from "lucide-react";

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
      const response = await axios.post<ApiResponseClass<string[]>>(
        "/api/suggest-messages"
      );

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

  const charCount = content?.length ?? 0;
  const isNearLimit = charCount > 260;

  return (
    <div className="relative min-h-screen bg-slate-950 flex items-center justify-center px-4 py-16 overflow-hidden">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[420px] w-[420px] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[280px] w-[280px] rounded-full bg-violet-600/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-xl"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 mb-4">
            <MessageCircleMore className="h-6 w-6 text-indigo-400" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Send an Anonymous Message
          </h1>
          <p className="text-slate-400 mt-3">
            to{" "}
            <span className="text-indigo-400 font-medium">@{username}</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
        >
          <Card className="bg-slate-900/80 backdrop-blur-sm border-slate-800 shadow-2xl shadow-black/40">
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Textarea
                    {...register("content")}
                    placeholder="Write your anonymous message here..."
                    className="min-h-[130px] bg-slate-950/80 border-slate-800 text-white placeholder:text-slate-500 focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:border-indigo-600 resize-none transition-colors"
                  />
                  <div className="flex justify-between items-center mt-2">
                    {form.formState.errors.content ? (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-red-400"
                      >
                        {form.formState.errors.content.message}
                      </motion.p>
                    ) : (
                      <span />
                    )}
                    <span
                      className={`text-xs tabular-nums transition-colors ${
                        isNearLimit ? "text-amber-400" : "text-slate-500"
                      }`}
                    >
                      {charCount}/300
                    </span>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/20 transition-all"
                  >
                    {isSending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    Send Message
                  </Button>
                </motion.div>
              </form>

              <div className="relative my-7">
                <Separator className="bg-slate-800" />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 px-3 text-xs uppercase tracking-wider text-slate-500">
                  or
                </span>
              </div>

              <div>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <Button
                    type="button"
                    variant="outline"
                    onClick={fetchSuggestions}
                    disabled={isSuggesting}
                    className="w-full bg-transparent border-slate-700 text-slate-300 hover:bg-indigo-600/10 hover:border-indigo-500/50 hover:text-indigo-300 transition-all"
                  >
                    {isSuggesting ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4 mr-2" />
                    )}
                    Suggest Messages
                  </Button>
                </motion.div>

                <AnimatePresence>
                  {suggestions.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 space-y-2 overflow-hidden"
                    >
                      {suggestions.map((suggestion, index) => (
                        <motion.button
                          key={index}
                          type="button"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.05 * index }}
                          whileHover={{ x: 2 }}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full text-left text-sm text-slate-300 bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-3 hover:border-indigo-500/50 hover:bg-indigo-600/5 hover:text-white transition-colors"
                        >
                          {suggestion}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default PublicMessagePage;