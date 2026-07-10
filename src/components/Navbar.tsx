"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import { User } from "next-auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Features", href: "/#features" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
];

const Navbar = () => {
  const { data: session } = useSession();
  const user: User = session?.user as User;
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 p-4 md:px-6 md:py-4">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-slate-100 hover:text-indigo-400 transition-colors duration-200"
        >
          True Feedback
        </Link>

        {/* added: scroll-to-section links — plain <a> tags used here (not next/link)
            to avoid a Next.js App Router quirk where clicking a Link with a hash
            while already on that route can duplicate the hash in the URL */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-400 hover:text-indigo-400 transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {session ? (
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
            <Link
              href="/dashboard"
              className="text-sm text-slate-300 hover:text-indigo-400 transition-colors duration-200"
            >
              Dashboard
            </Link>
            <span className="text-sm text-slate-400">
              Welcome,{" "}
              <span className="text-slate-200 font-medium">
                {user?.username || user?.email}
              </span>
            </span>
            <Button
              onClick={() => signOut()}
              className="w-full md:w-auto bg-slate-800 text-slate-100 hover:bg-slate-700 border border-slate-700 transition-colors duration-200"
            >
              Logout
            </Button>
          </div>
        ) : (
          <Link href="/sign-in">
            <Button className="w-full md:w-auto bg-indigo-600 text-white hover:bg-indigo-500 transition-colors duration-200 shadow-sm hover:shadow-indigo-500/30">
              Login
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;