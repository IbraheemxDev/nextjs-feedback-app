"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "I finally understood how my team actually felt about my leadership. Genuinely changed how I run meetings.",
    name: "Aisha K.",
    role: "Product Manager",
  },
  {
    quote:
      "Shared my link on my Instagram story once and got the most honest, kind messages I've ever received.",
    name: "Daniyal R.",
    role: "Content Creator",
  },
  {
    quote:
      "As a teacher, this gave my students a safe way to tell me what's actually working in class.",
    name: "Sara M.",
    role: "Educator",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="scroll-mt-24 bg-slate-950 py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-slate-50 md:text-4xl"
          >
            Loved by people who use it
          </motion.h2>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-indigo-600/30"
            >
              <Quote className="h-6 w-6 text-indigo-500/40" />
              <p className="mt-4 text-sm leading-relaxed text-slate-300">
                {t.quote}
              </p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 text-xs font-semibold text-white">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-100">
                    {t.name}
                  </p>
                  <p className="text-xs text-slate-500">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}