"use client";

import { AcceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import React, { useState, useCallback, useEffect } from "react";
import { ApiResponse } from "@/types/ApiResponse";
import { ApiResponse as ApiResponseClass } from "@/utils/ApiResponse";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { z } from "zod";
import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCcw, Copy, Inbox, Link2, Bell } from "lucide-react";
import MessageCard from "@/components/MessageCard";
import { Separator } from "@/components/ui/separator";
import { User } from "next-auth";
import { Message } from "@/types/Message"; // fixed: plain frontend type, not mongoose's (single import, no duplicate)

type AcceptMessageFormData = z.infer<typeof AcceptMessageSchema>;

function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);
  const [profileUrl, setProfileUrl] = useState("");

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const { data: session } = useSession();

  const form = useForm<AcceptMessageFormData>({
    resolver: zodResolver(AcceptMessageSchema),
    defaultValues: {
      acceptMessages: false,
    },
  });
  const { watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");

  const fetchAcceptMessages = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get<ApiResponse>("/api/accept-messages");
      setValue(
        "acceptMessages",
        response.data.data?.isAcceptingMessages ?? false
      );
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description:
          axiosError.response?.data?.message ??
          "Failed to fetch message settings",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  // fixed: was calling "/api/accept-messages" (only returns toggle state,
  // never returns actual messages) — now calls the correct "/api/get-messages"
  // route, and unwraps the nested { data: { messages } } shape from utils/ApiResponse
  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      setIsSwitchLoading(false);
      try {
        const response = await axios.get<
          ApiResponseClass<{ messages: Message[] }>
        >("/api/get-messages");

        setMessages(response.data.data?.messages || []);
        if (refresh) {
          toast.success("Refreshed Messages", {
            description: "Showing latest messages",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponseClass<null>>;
        toast.error("Error", {
          description:
            axiosError.response?.data?.message ??
            "Failed to fetch message settings",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [setIsLoading, setMessages]
  );

  useEffect(() => {
    if (!session || !session.user) return;

    fetchMessages();
    fetchAcceptMessages();
  }, [session, fetchAcceptMessages, fetchMessages]);

  useEffect(() => {
    if (typeof window !== "undefined" && session?.user) {
      const { username } = session.user as User;
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      setProfileUrl(`${baseUrl}/u/${username}`);
    }
  }, [session]);

  const handleSwitchChange = async (checked: boolean) => {
    try {
      await axios.post("/api/accept-messages", {
        acceptMessages: checked,
      });

      setValue("acceptMessages", checked);

      toast.success("Message settings updated");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description:
          axiosError.response?.data?.message ??
          "Failed to update message settings",
      });
    }
  };

  if (!session || !session.user) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <p className="text-slate-400">Please login to view your dashboard.</p>
      </div>
    );
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    toast.success("URL Copied!", {
      description: "Profile URL has been copied to clipboard.",
    });
  };

  return (
    <div className="min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 md:p-10 bg-gradient-to-b from-slate-900/80 to-slate-900/40 backdrop-blur-sm border border-slate-800 rounded-2xl w-full max-w-6xl shadow-2xl shadow-black/40"
      >
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-3xl md:text-4xl font-bold mb-8 text-slate-100 tracking-tight"
        >
          User Dashboard
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-5 rounded-xl border border-slate-800 bg-slate-800/40 p-4"
        >
          <h2 className="flex items-center gap-2 text-sm font-medium text-indigo-300 mb-3">
            <Link2 className="h-4 w-4" />
            Your Unique Link
          </h2>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={profileUrl}
              disabled
              className="flex-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none"
            />
            <Button
              onClick={copyToClipboard}
              className="bg-indigo-600 hover:bg-indigo-500 text-white transition-colors duration-200 shadow-sm hover:shadow-indigo-500/30"
            >
              <Copy className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-6 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-800/40 px-4 py-4"
        >
          <span className="flex items-center gap-2 text-slate-200 text-sm font-medium">
            <Bell className="h-4 w-4 text-violet-400" />
            Accept Messages:{" "}
            <span
              className={
                acceptMessages ? "text-emerald-400" : "text-slate-500"
              }
            >
              {acceptMessages ? "On" : "Off"}
            </span>
          </span>
          <Switch
            checked={acceptMessages}
            onCheckedChange={handleSwitchChange}
            disabled={isSwitchLoading}
            className="data-[state=checked]:bg-indigo-600"
          />
        </motion.div>

        <Separator className="bg-slate-800 mb-6" />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-between mb-6"
        >
          <h2 className="text-lg font-semibold text-slate-200">
            Your Messages
          </h2>
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              fetchMessages(true);
            }}
            className="border-slate-700 text-slate-300 bg-transparent hover:bg-slate-800 hover:text-white hover:border-indigo-600/50 transition-all duration-200"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCcw className="h-4 w-4" />
            )}
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <motion.div
                key={message._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
              >
                <MessageCard
                  message={message}
                  onMessageDelete={handleDeleteMessage}
                />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="col-span-full flex flex-col items-center justify-center py-16 text-slate-500"
            >
              <Inbox className="h-10 w-10 mb-3 opacity-40" />
              <p className="text-sm">No messages to display.</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Page;