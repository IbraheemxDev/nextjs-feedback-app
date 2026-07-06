"use client";

/* =========================
   Imports
========================= */
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react"; // FIX: this was missing, causing "signIn is not defined"

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";

import { signInSchema } from "@/schemas/signInSchema";

/* ===========================================================
   Sign In Page
=========================================================== */

const SignInPage = () => {
  /* ===========================================================
      States
  =========================================================== */

  // Loading state while sign-in request is processing
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ===========================================================
      Hooks
  =========================================================== */

  // Next.js navigation
  const router = useRouter();

  /* ===========================================================
      React Hook Form + Zod Validation
  =========================================================== */

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  /* ===========================================================
      Sign In Request
  =========================================================== */

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    // Start loading
    setIsSubmitting(true);

    try {
      // Authenticate user with NextAuth credentials provider
      const result = await signIn("credentials", {
        redirect: false,
        identifier: data.identifier,
        password: data.password,
      });

      // Invalid credentials
      if (result?.error) {
        toast.error("Error", {
          description: "Incorrect username or password",
        });
        return;
      }

      // Redirect after successful login
      if (result?.url) {
        router.replace("/dashboard");
      }
    } finally {
      // Stop loading
      setIsSubmitting(false);
    }
  };
  // FIX: removed the stray extra "};" that was here before — it was closing
  // the component early and breaking the whole file's syntax.

  /* ===========================================================
      UI
  =========================================================== */

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">
        {/* ================= Header ================= */}
        <div className="text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Join True Feedback
          </h1>
          <p className="mb-4">Sign In to start your anonymous adventure</p>
        </div>

        {/* ================= Sign In Form ================= */}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* ==================== Identifier Field ==================== */}
            <Controller
              name="identifier"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="identifier">Email/Username</FieldLabel>
                  <Input
                    {...field}
                    id="identifier"
                    placeholder="Email/Username"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* ==================== Password Field ==================== */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="Password"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {/* ================= Submit Button ================= */}
          <Button type="submit" disabled={isSubmitting} className="mt-6 w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              "SignIn"
            )}
          </Button>
        </form>

        {/* ================= Footer ================= */}
        <div className="mt-4 text-center">
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;