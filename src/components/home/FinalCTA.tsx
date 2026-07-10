"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-indigo-950/80 via-slate-900 to-violet-950/60 px-8 py-16 text-center shadow-2xl shadow-indigo-950/40 md:px-16 md:py-20"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-[100px]" />

          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight text-slate-50 md:text-4xl">
              Start Receiving Honest{" "}
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                Anonymous Feedback
              </span>{" "}
              Today.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-slate-400">
              It takes less than a minute to create your account and share
              your link.
            </p>
            <Link href="/sign-up">
              <Button className="group mt-8 h-12 bg-indigo-600 px-8 text-base text-white shadow-lg shadow-indigo-600/30 transition-all duration-200 hover:bg-indigo-500 hover:shadow-indigo-500/40">
                Create Free Account
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}