"use client";

/* =========================
   Imports
========================= */
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import axios, { AxiosError } from "axios";
import { useDebounceCallback } from "usehooks-ts";

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

import { signUpSchema } from "@/schemas/signUpSchema";
import { ApiResponse } from "@/types/ApiResponse";

/* ===========================================================
   Sign Up Page
=========================================================== */

const SignUpPage = () => {
  /* ===========================================================
      States
  =========================================================== */

  // Stores username for debounce API checking
  const [username, setUsername] = useState("");

  // Shows message like:
  // "Username is unique" or "Username already exists"
  const [usernameMessage, setUsernameMessage] = useState("");

  // Loading state while username is being checked
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);

  // Loading state while signup request is processing
  const [isSubmitting, setIsSubmitting] = useState(false);

  /* ===========================================================
      Hooks
  =========================================================== */

  // Wait 300ms before updating username state
  const debounced = useDebounceCallback(setUsername, 300);

  // Next.js navigation
  const router = useRouter();

  /* ===========================================================
      React Hook Form + Zod Validation
  =========================================================== */

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),

    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  /* ===========================================================
      Check Username Availability
  =========================================================== */

  useEffect(() => {
    const checkUsernameUnique = async () => {
      // Don't call API if username is empty
      if (!username) return;

      setIsCheckingUsername(true);
      setUsernameMessage("");

      try {
        const response = await axios.get(
          `/api/check-username-unique?username=${username}`
        );

        setUsernameMessage(response.data.message);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;

        setUsernameMessage(
          axiosError.response?.data.message ?? "Error checking username"
        );
      } finally {
        setIsCheckingUsername(false);
      }
    };

    checkUsernameUnique();
  }, [username]);

  /* ===========================================================
      Form Submit
  =========================================================== */

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);

    try {
      // Send signup data to backend
      const response = await axios.post<ApiResponse>("/api/sign-up", data);

      toast.success("Success", {
        description: response.data.message,
      });

      // Redirect user to verification page
      router.replace(`/verify/${username}`);
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
            Sign up to start your anonymous adventure
          </p>
        </div>

        {/* ================= Signup Form ================= */}

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* ======================================================
                Username Field
            ====================================================== */}

            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="text-slate-300">
                    Username
                  </FieldLabel>

                  <Input
                    placeholder="Username"
                    {...field}
                    onChange={(e) => {
                      // Update React Hook Form
                      field.onChange(e);

                      // Debounced username checking
                      debounced(e.target.value);
                    }}
                    className="bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-500 focus-visible:ring-indigo-600"
                  />

                  {/* Loading Spinner */}

                  {isCheckingUsername && (
                    <Loader2 className="animate-spin h-4 w-4 text-slate-400" />
                  )}

                  {/* Username Availability */}

                  {!isCheckingUsername && usernameMessage && (
                    <p
                      className={`text-sm ${
                        usernameMessage === "Username is unique"
                          ? "text-emerald-400"
                          : "text-red-400"
                      }`}
                    >
                      {usernameMessage}
                    </p>
                  )}

                  <p className="text-sm text-slate-500">
                    This is your public display name.
                  </p>

                  {/* Validation Error */}

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* ======================================================
                Email Field
            ====================================================== */}

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="text-slate-300">Email</FieldLabel>

                  <Input
                    placeholder="Email"
                    {...field}
                    className="bg-slate-950 border-slate-800 text-slate-200 placeholder:text-slate-500 focus-visible:ring-indigo-600"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* ======================================================
                Password Field
            ====================================================== */}

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel className="text-slate-300">
                    Password
                  </FieldLabel>

                  <Input
                    type="password"
                    placeholder="Password"
                    {...field}
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
              "Sign Up"
            )}
          </Button>
        </form>

        {/* ================= Footer ================= */}

        <div className="mt-4 text-center">
          <p className="text-slate-400 text-sm">
            Already a member?{" "}
            <Link
              href="/sign-in"
              className="text-indigo-400 hover:text-indigo-300 transition-colors duration-200"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;