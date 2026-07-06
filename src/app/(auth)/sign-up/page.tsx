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
          axiosError.response?.data.message ??
            "Error checking username"
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
      const response = await axios.post<ApiResponse>(
        "/api/sign-up",
        data
      );

      toast.success("Success", {
        description: response.data.message,
      });

      // Redirect user to verification page
      router.replace(`/verify/${username}`);
    } catch (error) {
      console.error("Signup Error:", error);

      const axiosError = error as AxiosError<ApiResponse>;

      const errorMessage =
        axiosError.response?.data.message ??
        "Something went wrong";

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
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow-md">

        {/* ================= Header ================= */}

        <div className="text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Join True Feedback
          </h1>

          <p className="mb-4">
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

                  <FieldLabel>Username</FieldLabel>

                  <Input
                    placeholder="Username"
                    {...field}
                    onChange={(e) => {
                      // Update React Hook Form
                      field.onChange(e);

                      // Debounced username checking
                      debounced(e.target.value);
                    }}
                  />

                  {/* Loading Spinner */}

                  {isCheckingUsername && (
                    <Loader2 className="animate-spin" />
                  )}

                  {/* Username Availability */}

                  {!isCheckingUsername && usernameMessage && (
                    <p
                      className={`text-sm ${
                        usernameMessage === "Username is unique"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {usernameMessage}
                    </p>
                  )}

                  <p className="text-sm text-muted-foreground">
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

                  <FieldLabel>Email</FieldLabel>

                  <Input
                    placeholder="Email"
                    {...field}
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

                  <FieldLabel>Password</FieldLabel>

                  <Input
                    type="password"
                    placeholder="Password"
                    {...field}
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
            className="mt-6 w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </>
            ) : (
              "Signup"
            )}
          </Button>
        </form>

        {/* ================= Footer ================= */}

        <div className="mt-4 text-center">
          <p>
            Already a member?{" "}
            <Link
              href="/sign-in"
              className="text-blue-600 hover:text-blue-800"
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