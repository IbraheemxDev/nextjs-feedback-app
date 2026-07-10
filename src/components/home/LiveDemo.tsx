"use client";

import { motion } from "framer-motion";
import { Copy, Bell, Inbox, TrendingUp, Users2 } from "lucide-react";

const demoMessages = [
  { text: "You're incredibly easy to talk to.", time: "2m ago" },
  { text: "Your work ethic inspires the whole team.", time: "18m ago" },
  { text: "Loved the way you handled that meeting today!", time: "1h ago" },
];

export default function LiveDemo() {
  return (
    <section id="demo" className="scroll-mt-24 relative overflow-hidden bg-slate-950 py-16 md:py-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-indigo-600/10 to-cyan-500/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-slate-50 md:text-4xl"
          >
            See it in action
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-4 text-slate-400"
          >
            A real look at the dashboard that manages your messages.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-2xl shadow-black/50 backdrop-blur-md"
        >
          {/* fake browser chrome */}
          <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-900/80 px-5 py-3">
            <span className="h-3 w-3 rounded-full bg-red-500/70" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/70" />
            <span className="ml-4 rounded-md bg-slate-800 px-3 py-1 text-xs text-slate-500">
              mysterymessage.app/dashboard
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3 md:p-8">
            {/* left: link + toggle + stats */}
            <div className="space-y-4 md:col-span-1">
              <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-4">
                <p className="mb-2 text-xs font-medium text-indigo-300">
                  Your Link
                </p>
                <div className="flex items-center justify-between rounded-lg bg-slate-950 px-3 py-2">
                  <span className="truncate text-xs text-slate-400">
                    mysterymessage.app/u/alex
                  </span>
                  <Copy className="h-3.5 w-3.5 flex-shrink-0 text-indigo-400" />
                </div>
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-800/40 p-4">
                <span className="flex items-center gap-2 text-sm text-slate-200">
                  <Bell className="h-4 w-4 text-violet-400" />
                  Accepting
                </span>
                <span className="h-5 w-9 rounded-full bg-indigo-600 p-0.5">
                  <span className="block h-4 w-4 translate-x-4 rounded-full bg-white transition-transform" />
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-3 text-center">
                  <TrendingUp className="mx-auto h-4 w-4 text-cyan-400" />
                  <p className="mt-1 text-lg font-bold text-slate-100">128</p>
                  <p className="text-[10px] text-slate-500">This week</p>
                </div>
                <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-3 text-center">
                  <Users2 className="mx-auto h-4 w-4 text-indigo-400" />
                  <p className="mt-1 text-lg font-bold text-slate-100">2.4k</p>
                  <p className="text-[10px] text-slate-500">Visitors</p>
                </div>
              </div>
            </div>

            {/* right: incoming messages */}
            <div className="space-y-3 md:col-span-2">
              <p className="flex items-center gap-2 text-xs font-medium text-slate-400">
                <Inbox className="h-3.5 w-3.5" />
                Recent Messages
              </p>
              {demoMessages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="rounded-xl border border-slate-800 bg-slate-800/40 p-4"
                >
                  <p className="text-sm text-slate-200">{msg.text}</p>
                  <p className="mt-1 text-[11px] text-slate-500">
                    {msg.time}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}