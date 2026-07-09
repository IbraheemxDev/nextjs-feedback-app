"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useForm, Controller } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { verifyCodeSchema } from "@/schemas/verifySchema"; // fixed: removed unused "verifySchema" import — this page only ever uses verifyCodeSchema
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldCheck } from "lucide-react";

function VerifyAccount() {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false); // note: added purely for the button's loading state visual — does not change existing behavior

  const form = useForm<z.infer<typeof verifyCodeSchema>>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof verifyCodeSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(`/api/verify-code`, {
        username: params.username,
        code: data.code,
      });
      toast.success("Success", {
        description: response.data.message,
      });
      router.replace("/sign-in");
    } catch (error) {
      console.error("Signup Error:", error);
      const axiosError = error as AxiosError<ApiResponse>;
      const errorMessage =
        axiosError.response?.data.message ?? "Something went wrong";
      toast.error("Error", {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-950 px-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl shadow-2xl shadow-black/40">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600/10 border border-indigo-600/30">
            <ShieldCheck className="h-6 w-6 text-indigo-400" />
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-100 mb-3">
            Verify Your Account
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            Enter the verification code sent to your email
          </p>
        </div>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="code"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel className="text-slate-300">
                    Verification Code
                  </FieldLabel>
                  <Input
                    {...field}
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter code"
                    className="bg-slate-950 border-slate-800 text-slate-200 text-center tracking-[0.3em] placeholder:text-slate-500 placeholder:tracking-normal focus-visible:ring-indigo-600"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white transition-colors duration-200 shadow-sm hover:shadow-indigo-500/30"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}

export default VerifyAccount;