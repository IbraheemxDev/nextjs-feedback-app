"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, MessageCircle, Sparkles } from "lucide-react";

const floatingMessages = [
  { text: "You always bring such positive energy to the team 🌟", top: "6%", left: "2%", delay: 0 },
  { text: "Loved your presentation, super clear and confident!", top: "36%", right: "2%", delay: 0.6 },
  { text: "Honestly one of the kindest people I know.", top: "68%", left: "10%", delay: 1.1 },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-950 pt-16 pb-16 md:pt-10 md:pb-20">
      {/* Aurora gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-600/30 via-violet-600/25 to-cyan-500/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.15)_1px,transparent_0)] bg-[size:32px_32px] opacity-20" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2">
        {/* Left: copy */}
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-1.5 text-xs font-medium text-slate-300 backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
            Anonymous feedback, made beautiful
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold tracking-tight text-slate-50 sm:text-5xl md:text-6xl"
          >
            Receive Honest{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Anonymous Feedback.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-xl text-base text-slate-400 md:text-lg lg:mx-0"
          >
            Share your personal link and let people tell you what they really
            think — no names, no pressure, just honest feedback delivered
            straight to your dashboard.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
          >
            <Link href="/sign-up">
              <Button className="group h-12 w-full bg-indigo-600 px-8 text-base text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:bg-indigo-500 hover:shadow-indigo-500/30 sm:w-auto">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Link>
            <a href="/#demo">
              <Button
                variant="outline"
                className="h-12 w-full border-slate-700 bg-transparent px-8 text-base text-slate-200 transition-all duration-200 hover:border-indigo-500/50 hover:bg-slate-800 sm:w-auto"
              >
                <PlayCircle className="mr-2 h-4 w-4" />
                View Demo
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Right: floating glass message cards */}
        <div className="relative hidden h-[420px] overflow-hidden lg:block">
          {floatingMessages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{
                opacity: 1,
                y: [0, -14, 0],
              }}
              transition={{
                opacity: { duration: 0.6, delay: 0.4 + msg.delay },
                y: {
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: msg.delay,
                },
              }}
              style={{ top: msg.top, left: msg.left, right: msg.right }}
              className="absolute w-64 md:w-72 rounded-2xl border border-slate-700/60 bg-slate-900/70 p-4 shadow-xl shadow-black/40 backdrop-blur-md"
            >
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-500/15">
                  <MessageCircle className="h-3.5 w-3.5 text-indigo-400" />
                </div>
                <span className="text-xs font-medium text-slate-500">
                  Anonymous
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-200">
                {msg.text}
              </p>
            </motion.div>
          ))}

          {/* subtle glow orb behind the cards */}
          <div className="absolute right-10 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[100px]" />
        </div>
      </div>
    </section>
  );
}