"use client";

import { motion } from "framer-motion";
import { UserPlus, Share2, Inbox, ArrowDown } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    description: "Sign up in seconds with just your email and username.",
  },
  {
    icon: Share2,
    title: "Share Your Link",
    description: "Post your unique profile link anywhere — bio, stories, chats.",
  },
  {
    icon: Inbox,
    title: "Receive Anonymous Messages",
    description: "Watch honest feedback roll into your dashboard in real time.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-24 bg-slate-950 py-16 md:py-10">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-slate-50 md:text-4xl"
          >
            How it works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-slate-400"
          >
            Three simple steps to start hearing what people really think.
          </motion.p>
        </div>

        <div className="mt-16 flex flex-col items-center">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="flex w-full max-w-md items-center gap-5 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/20 to-violet-500/20 text-indigo-400">
                  <step.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    {step.description}
                  </p>
                </div>
              </motion.div>

              {i < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 + 0.2 }}
                  className="py-3"
                >
                  <ArrowDown className="h-5 w-5 text-slate-700" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}