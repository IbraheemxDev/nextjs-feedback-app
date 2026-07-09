"use client";
import React from "react";
import { X } from "lucide-react";
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
    <Card className="relative bg-slate-900/60 border border-slate-800 rounded-xl shadow-lg shadow-black/20 hover:border-indigo-600/40 hover:shadow-indigo-950/30 transition-all duration-200">
      <CardHeader>
        {/* fixed: hardcoded "Card Title" replaced with actual message content */}
        <CardTitle className="text-slate-100 font-medium leading-relaxed pr-8">
          {message.content}
        </CardTitle>
        <AlertDialog>
          <AlertDialogTrigger
            render={
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-4 right-4 z-10 h-7 w-7 bg-slate-800 hover:bg-red-600/90 text-slate-400 hover:text-white transition-colors duration-200"
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
        <CardDescription className="text-slate-500 text-xs">
          {new Date(message.createdAt).toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default MessageCard;