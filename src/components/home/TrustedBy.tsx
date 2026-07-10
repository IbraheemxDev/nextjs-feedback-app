"use client";

import { motion } from "framer-motion";
import { GraduationCap, Code2, Palette, Building2, Rocket, Users } from "lucide-react";

const logos = [
  { icon: GraduationCap, label: "Students" },
  { icon: Code2, label: "Developers" },
  { icon: Palette, label: "Creators" },
  { icon: Building2, label: "Startups" },
  { icon: Rocket, label: "Founders" },
  { icon: Users, label: "Teams" },
];

export default function TrustedBy() {
  return (
    <section className="border-y border-slate-800 bg-slate-950 py-8">
      <div className="mx-auto max-w-6xl px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-sm font-medium uppercase tracking-widest text-slate-500"
        >
          Trusted by students, creators, developers and professionals
        </motion.p>

        <div className="mt-8 grid grid-cols-3 gap-6 sm:grid-cols-6">
          {logos.map((logo, i) => (
            <motion.div
              key={logo.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex flex-col items-center gap-2 text-slate-600 transition-colors duration-200 hover:text-indigo-400"
            >
              <logo.icon className="h-6 w-6" />
              <span className="text-xs">{logo.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}