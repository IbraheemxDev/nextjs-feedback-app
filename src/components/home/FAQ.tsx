"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Can people find out who sent a message?",
    answer:
      "No. Sender identity is never captured or stored — every message is completely anonymous by design.",
  },
  {
    question: "Do I need to pay to use Mystery Message?",
    answer:
      "Creating an account and receiving messages is completely free. No credit card required.",
  },
  {
    question: "Can I stop receiving messages anytime?",
    answer:
      "Yes — the Accept Messages toggle on your dashboard lets you turn incoming messages on or off instantly.",
  },
  {
    question: "Can I delete messages I don't want to keep?",
    answer:
      "Absolutely. Every message in your dashboard can be deleted permanently with one click.",
  },
  {
    question: "Is my account secure?",
    answer:
      "Yes, authentication is handled with secure, industry-standard credential-based sign in.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="scroll-mt-24 bg-slate-950 py-16 md:py-20">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight text-slate-50 md:text-4xl"
          >
            Frequently asked questions
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-12 rounded-2xl border border-slate-800 bg-slate-900/50 px-6 backdrop-blur-sm"
        >
         <Accordion multiple={false} className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-slate-800"
              >
                <AccordionTrigger className="text-left text-slate-100 hover:text-indigo-400 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-slate-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}