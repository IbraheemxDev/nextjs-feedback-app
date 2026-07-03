import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export const authOptions: NextAuthOptions = {
  // Configure authentication providers
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",

      // Define login form fields
      credentials: {
        identifier: {
          label: "Email or Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      // Authenticate user credentials
      async authorize(credentials): Promise<any> {
        // Establish database connection
        await dbConnect();

        try {
          // Ensure required credentials are provided
          if (!credentials?.identifier || !credentials?.password) {
            throw new Error("Missing credentials");
          }

          // Normalize login identifier
          const identifier = credentials.identifier.trim().toLowerCase();

          // Find user by email or username
          const user = await UserModel.findOne({
            $or: [{ email: identifier }, { username: identifier }],
          });

          if (!user) {
            throw new Error("User not found");
          }

          // Prevent unverified users from logging in
          if (!user.isVerified) {
            throw new Error("Please verify your account before login");
          }

          // Verify password
          const isPasswordCorrect = await user.comparePassword(
            credentials.password,
          );

          if (!isPasswordCorrect) {
            throw new Error("Incorrect password");
          }

          // Return authenticated user
          return user;
        } catch (error) {
          throw error;
        }
      },
    }),
  ],

  // Customize JWT and session data
  callbacks: {
    async jwt({ token, user }) {
      // Store user information inside the JWT
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessage = user.isAcceptingMessages;
        token.username = user.username;
      }

      return token;
    },

    async session({ session, token }) {
      // Expose JWT data in the session object
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }

      return session;
    },
  },

  // Custom authentication pages
  pages: {
    signIn: "/sign-in",
  },

  // Use JWT-based sessions
  session: {
    strategy: "jwt",
  },

  // Secret used to sign JWTs
  secret: process.env.NEXTAUTH_SECRET,
};