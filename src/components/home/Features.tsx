"use client";

import { motion } from "framer-motion";
import {
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Lock,
  ToggleLeft,
  LayoutDashboard,
} from "lucide-react";

const features = [
  {
    icon: MessageSquareText,
    title: "Anonymous Messaging",
    description:
      "Let anyone send you honest feedback without ever revealing who they are.",
    color: "text-indigo-400",
    glow: "group-hover:shadow-indigo-500/20",
  },
  {
    icon: ShieldCheck,
    title: "Privacy First",
    description:
      "No sender identity is ever stored or exposed — your senders stay fully anonymous.",
    color: "text-violet-400",
    glow: "group-hover:shadow-violet-500/20",
  },
  {
    icon: Sparkles,
    title: "AI Powered Replies",
    description:
      "Get smart, ready-to-send message prompts generated for your senders in one click.",
    color: "text-cyan-400",
    glow: "group-hover:shadow-cyan-500/20",
  },
  {
    icon: Lock,
    title: "Secure Authentication",
    description:
      "Your account is protected with modern, secure credential-based authentication.",
    color: "text-indigo-400",
    glow: "group-hover:shadow-indigo-500/20",
  },
  {
    icon: ToggleLeft,
    title: "Accept Message Toggle",
    description:
      "Turn message-receiving on or off instantly, whenever you need a break.",
    color: "text-violet-400",
    glow: "group-hover:shadow-violet-500/20",
  },
  {
    icon: LayoutDashboard,
    title: "Beautiful Dashboard",
    description:
      "Manage, read, and delete every message from one clean, modern dashboard.",
    color: "text-cyan-400",
    glow: "group-hover:shadow-cyan-500/20",
  },
];

export default function Features() {
  return (
    <section id="features" className="scroll-mt-14 bg-slate-950 py-16 md:py-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-slate-50 md:text-4xl"
          >
            Everything you need, built in
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-slate-400"
          >
            A focused feature set designed to make giving and receiving
            feedback effortless.
          </motion.p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className={`group relative rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-700 hover:shadow-xl ${feature.glow}`}
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-800/80 transition-transform duration-300 group-hover:scale-110">
                <feature.icon className={`h-5 w-5 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-slate-100">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}