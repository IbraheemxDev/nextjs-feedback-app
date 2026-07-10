"use client";
import React from "react";
import { X, MessageSquareText } from "lucide-react";
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ApiResponse } from "@/types/ApiResponse";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button"; // fixed: was importing from @react-email/components
import { Message } from "@/types/Message";
type MessageCardProps = {
  message: Message;
  onMessageDelete: (messageId: string) => void;
};

const MessageCard = ({ message, onMessageDelete }: MessageCardProps) => {
  // handle delete confirmation from alert dialog
  const handleDeleteConfirm = async () => {
    try {
      // fixed: missing "await" — response.data was being read before the promise resolved
      // fixed: url was using whole "message" object instead of "message._id"
      const response = await axios.delete<ApiResponse>(
        `/api/delete-message/${message._id}`
      );
      toast.success("Success", {
        description: response.data.message,
      });
      onMessageDelete(message._id);
    } catch (error) {
      console.error("Delete message error:", error); // temporary debug log
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description:
          axiosError.response?.data?.message ?? "Failed to delete message",
      });
    }
  };

  // fixed: "return" was placed after the function body closed with "}",
  // making the JSX completely unreachable / outside the component.
  return (
    <Card className="relative overflow-hidden border border-slate-700/60 bg-gradient-to-br from-slate-800/80 to-slate-900/80 rounded-xl shadow-lg shadow-black/30 hover:border-indigo-500/50 hover:shadow-indigo-950/40 transition-all duration-200">
      {/* left accent bar for a bit of color distinction from the page bg */}
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-indigo-500 to-violet-500" />

      <CardHeader className="pl-5">
        <div className="flex items-start gap-2 pr-8">
          <MessageSquareText className="h-4 w-4 text-indigo-400 mt-1 flex-shrink-0" />
          {/* fixed: hardcoded "Card Title" replaced with actual message content */}
          <CardTitle className="text-slate-100 font-medium leading-relaxed">
            {message.content}
          </CardTitle>
        </div>

        <AlertDialog>
          <AlertDialogTrigger
            render={
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-4 right-4 z-10 h-7 w-7 bg-slate-700/80 hover:bg-red-600 text-slate-300 hover:text-white transition-colors duration-200"
              />
            }
          >
            <X className="w-4 h-4" />
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-slate-900 border border-slate-800">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-slate-100">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription className="text-slate-400">
                This action cannot be undone. This will permanently delete this
                message from your inbox.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-500 text-white"
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* fixed: hardcoded date -> actual createdAt from message */}
        <CardDescription className="text-slate-500 text-xs pl-6">
          {new Date(message.createdAt).toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default MessageCard;