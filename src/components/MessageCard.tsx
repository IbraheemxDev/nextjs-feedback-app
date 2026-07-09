"use client";
import React from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import axios from "axios";
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
import { Message } from "@/model/User";

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
      // added: delete call had no error handling at all
      toast.error("Error", {
        description: "Failed to delete message",
      });
    }
  };

  // fixed: "return" was placed after the function body closed with "}",
  // making the JSX completely unreachable / outside the component.
  return (
    <Card>
      <CardHeader>
        {/* fixed: hardcoded "Card Title" replaced with actual message content */}
        <CardTitle>{message.content}</CardTitle>
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="destructive" />}>
            <X className="w-5 h-5" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {/* fixed: hardcoded date -> actual createdAt from message */}
        <CardDescription>
          {new Date(message.createdAt).toLocaleString()}
        </CardDescription>
        <CardAction>Card Action</CardAction>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default MessageCard;