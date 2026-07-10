'use client'
import Hero from "@/components/home/Hero";
import TrustedBy from "@/components/home/TrustedBy";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import LiveDemo from "@/components/home/LiveDemo";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import FinalCTA from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <main className="bg-slate-950 pt-0">
      <Hero />
      <TrustedBy />
      <Features />
      <HowItWorks />
      <LiveDemo />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </main>
  );
}