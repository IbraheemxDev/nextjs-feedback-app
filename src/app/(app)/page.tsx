"use client";
import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";

const Home = () => {
  return (
    <>
      <main className="flex-grow flex flex-col items-center justify-center px-4 md:px-24 py-16 md:py-24 bg-slate-950 text-white">
        <section className="text-center mb-10 md:mb-14 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-100">
            Dive into the World of{" "}
            <span className="text-indigo-400">Anonymous Feedback</span>
          </h1>
          <p className="mt-4 text-base md:text-lg text-slate-400">
            True Feedback — where your identity remains a secret.
          </p>
        </section>
        <Carousel
          plugins={[Autoplay({ delay: 2000 })]}
          className="w-full max-w-lg md:max-w-xl"
        >
          <CarouselContent>
            {messages.map((message, index) => (
              <CarouselItem key={index} className="p-4">
                <Card className="bg-slate-900/60 border border-slate-800 rounded-2xl shadow-xl shadow-black/30 hover:border-indigo-600/40 transition-colors duration-300">
                  <CardHeader>
                    <CardTitle className="text-slate-100">
                      {message.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
                    <Mail className="flex-shrink-0 text-indigo-400 h-5 w-5 mt-1" />
                    <div>
                      <p className="text-slate-300">{message.content}</p>
                      <p className="text-xs text-slate-500 mt-1">
                        {message.received}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </main>
      {/* Footer */}
      <footer className="text-center p-4 md:p-6 bg-slate-950 border-t border-slate-800 text-slate-500 text-sm">
        © 2026 True Feedback. All rights reserved.
      </footer>
    </>
  );
};

export default Home;