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

  /* ===========================================================
      UI
  =========================================================== */

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-slate-900/60 backdrop-blur-sm border border-slate-800 p-8 shadow-2xl shadow-black/40">
        {/* ================= Header ================= */}
        <div className="text-center">
          <h1 className="mb-3 text-3xl md:text-4xl font-extrabold tracking-tight text-slate-100">
            Join <span className="text-indigo-400">True Feedback</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base">
            Sign in to start your anonymous adventure
          </p>
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
                  <FieldLabel htmlFor="identifier" className="text-slate-300">
                    Email/Username
                  </FieldLabel>
                  <Input
                    {...field}
                    id="identifier"
                    placeholder="Email/Username"
                    aria-invalid={fieldState.invalid}
                    className="bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-500 focus-visible:ring-indigo-600"
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
                  <FieldLabel htmlFor="password" className="text-slate-300">
                    Password
                  </FieldLabel>
                  <Input
                    {...field}
                    id="password"
                    type="password"
                    placeholder="Password"
                    aria-invalid={fieldState.invalid}
                    className="bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-500 focus-visible:ring-indigo-600"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {/* ================= Submit Button ================= */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-500 text-white transition-colors duration-200 shadow-sm hover:shadow-indigo-500/30"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        {/* ================= Footer ================= */}
        <div className="mt-4 text-center">
          <p className="text-slate-400 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;