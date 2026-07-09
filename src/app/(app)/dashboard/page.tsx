// "use client ";
// import { AcceptMessageSchema } from "@/schemas/acceptMessageSchema";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { useSession } from "next-auth/react";
// import React, { use, useCallback, useEffect } from "react";
// import { ApiResponse } from "@/types/ApiResponse";
// import axios, { AxiosError } from "axios";
// import { toast } from "sonner";
// import { Switch } from "@/components/ui/switch";
// import { Button } from "@react-email/components";
// import { Loader2, RefreshCcw } from "lucide-react";
// import MessageCard from "@/components/MessageCard";
// import { Separator } from "@/components/ui/separator";
// import { User } from "next-auth";
// function page() {
//   const [messages, setMessages] = useState<Message>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSwitchLoading, setIsSwitchLoading] = useState(false);
//   const handleDeleteMessage = (message: string) => {
//     setMessages(messages.filter((message) => message._id !== messageId));
//   };
//   const { data: session } = useSession();
//   const form = useForm({
//     resolver: zodResolver(AcceptMessageSchema),
//   });
//   const { register, watch, setValue } = form;
//   const acceptMessages = watch("acceptMessages");

//   const fetchAcceptMessage = useCallback(async () => {
//     setIsSwitchLoading(true);
//     try {
//       const response = await axios.get("/api/accept-messages");
//       setValue("acceptMessages", response.data.isAcceptingMessage);
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;

//       toast.error("Error", {
//         description:
//           axiosError.response?.data.message ??
//           "Failed to fetch message settings",
//       });
//     } finally {
//       setIsSwitchLoading(false);
//     }
//   }, [setValue]);

//   const fetchMessages=useCallback(async(refresh:boolean=false)=>{
//     setIsLoading(true);
//     setIsSwitchLoading(false)
//     try {
//             const response = await axios.get("/api/accept-messages");
//             setMessages(response.data.messages || []);
//             if(refresh){
//               toast.success("Refreshed Messages", {
//         description:
//           "Showing latest messages",
//       });
//             }
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;

//       toast.error("Error", {
//         description:
//           axiosError.response?.data.message ??
//           "Failed to fetch message settings",
//       });
//     } finally {
//       setIsLoading(true)
//       setIsSwitchLoading(false);
//     }
//   },[setIsLoading,setMessages])

//    useEffect(() => {
//     if (!session || !session.user) return;

//     fetchMessages();

//     fetchAcceptMessages();
//   }, [session, setValue, toast, fetchAcceptMessages, fetchMessages]);

//    // Handle switch change
//   const handleSwitchChange = async () => {
//     try {
//       const response = await axios.post<ApiResponse>('/api/accept-messages', {
//         acceptMessages: !acceptMessages,
//       });
//       setValue('acceptMessages', !acceptMessages);
//       toast({
//         title: response.data.message,
//         variant: 'default',
//       });
//     } catch (error) {
//       const axiosError = error as AxiosError<ApiResponse>;
//       toast({
//         title: 'Error',
//         description:
//           axiosError.response?.data.message ??
//           'Failed to update message settings',
//         variant: 'destructive',
//       });
//     }
//   };

//   if (!session || !session.user) {
//     return <div>PlEASE LOGIN</div>;
//   }

//   const { username } = session.user as User;

//   const baseUrl = `${window.location.protocol}//${window.location.host}`;
//   const profileUrl = `${baseUrl}/u/${username}`;

//   const copyToClipboard = () => {
//     navigator.clipboard.writeText(profileUrl);
//     toast({
//       title: 'URL Copied!',
//       description: 'Profile URL has been copied to clipboard.',
//     });
//   };

//   return
//    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
//       <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

//       <div className="mb-4">
//         <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{' '}
//         <div className="flex items-center">
//           <input
//             type="text"
//             value={profileUrl}
//             disabled
//             className="input input-bordered w-full p-2 mr-2"
//           />
//           <Button onClick={copyToClipboard}>Copy</Button>
//         </div>
//       </div>

//       <div className="mb-4">
//         <Switch
//           {...register('acceptMessages')}
//           checked={acceptMessages}
//           onCheckedChange={handleSwitchChange}
//           disabled={isSwitchLoading}
//         />
//         <span className="ml-2">
//           Accept Messages: {acceptMessages ? 'On' : 'Off'}
//         </span>
//       </div>
//       <Separator />

//       <Button
//         className="mt-4"
//         variant="outline"
//         onClick={(e) => {
//           e.preventDefault();
//           fetchMessages(true);
//         }}
//       >
//         {isLoading ? (
//           <Loader2 className="h-4 w-4 animate-spin" />
//         ) : (
//           <RefreshCcw className="h-4 w-4" />
//         )}
//       </Button>
//       <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
//         {messages.length > 0 ? (
//           messages.map((message, index) => (
//             <MessageCard
//               key={message._id}
//               message={message}
//               onMessageDelete={handleDeleteMessage}
//             />
//           ))
//         ) : (
//           <p>No messages to display.</p>
//         )}
//       </div>
//     </div>
// }

// export default page;
"use client";

import { AcceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button"; // fixed: was importing from @react-email/components (copy-paste error)
import { Loader2, RefreshCcw } from "lucide-react";
import MessageCard from "@/components/MessageCard";
import { Separator } from "@/components/ui/separator";
import { User } from "next-auth";
import { Message } from "@/model/User"; // missing import, was causing "Message" to be undefined

function page() {
  // messages array state (was typed as single Message instead of Message[])
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitchLoading, setIsSwitchLoading] = useState(false);

  // remove a message from local state after delete (fixed shadowing bug: inner param was
  // also named "message", so message._id !== messageId referenced an undefined variable)
  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((msg) => msg._id !== messageId));
  };

  const { data: session } = useSession();
  const form = useForm({
    resolver: zodResolver(AcceptMessageSchema),
  });
  const { register, watch, setValue } = form;
  const acceptMessages = watch("acceptMessages");

  // fetch current "accept messages" toggle state
  const fetchAcceptMessage = useCallback(async () => {
    setIsSwitchLoading(true);
    try {
      const response = await axios.get("/api/accept-messages");
      setValue("acceptMessages", response.data.isAcceptingMessage);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description:
          axiosError.response?.data.message ??
          "Failed to fetch message settings",
      });
    } finally {
      setIsSwitchLoading(false);
    }
  }, [setValue]);

  // fetch all messages, optionally show a "refreshed" toast
  const fetchMessages = useCallback(
    async (refresh: boolean = false) => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/accept-messages");
        setMessages(response.data.messages || []);
        if (refresh) {
          toast.success("Refreshed Messages", {
            description: "Showing latest messages",
          });
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.error("Error", {
          description:
            axiosError.response?.data.message ??
            "Failed to fetch message settings",
        });
      } finally {
        setIsLoading(false); // fixed: was set to true, so loader never stopped spinning
      }
    },
    [setIsLoading, setMessages]
  );

  useEffect(() => {
    if (!session || !session.user) return;

    fetchMessages();
    fetchAcceptMessage(); // fixed: was calling "fetchAcceptMessages" (plural) which doesn't exist
  }, [session, setValue, fetchAcceptMessage, fetchMessages]); // removed "toast" from deps, not needed

  // toggle accept-messages switch
  const handleSwitchChange = async () => {
    try {
      const response = await axios.post<ApiResponse>("/api/accept-messages", {
        acceptMessages: !acceptMessages,
      });
      setValue("acceptMessages", !acceptMessages);
      // fixed: was using old shadcn toast({title, variant}) API instead of sonner
      toast.success(response.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error("Error", {
        description:
          axiosError.response?.data.message ??
          "Failed to update message settings",
      });
    }
  };

  if (!session || !session.user) {
    return <div>PlEASE LOGIN</div>;
  }

  const { username } = session?.user as User;

  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const profileUrl = `${baseUrl}/u/${username}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(profileUrl);
    // fixed: old shadcn toast({title, description}) API replaced with sonner
    toast.success("URL Copied!", {
      description: "Profile URL has been copied to clipboard.",
    });
  };

  // fixed: JSX was on a new line after "return", causing ASI to insert
  // "return;" and making the whole JSX unreachable dead code
  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{" "}
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2"
          />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </div>

      <div className="mb-4">
        <Switch
          {...register("acceptMessages")}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitchLoading}
        />
        <span className="ml-2">
          Accept Messages: {acceptMessages ? "On" : "Off"}
        </span>
      </div>
      <Separator />

      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message) => (
            <MessageCard
              key={message._id}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
  );
}

export default page;