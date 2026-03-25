"use client";

import { useEffect, useRef } from "react";
import gsap from "@/libs/gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subLineRef = useRef<HTMLParagraphElement>(null);
  const italicRef = useRef<HTMLHeadingElement>(null);
  const leftBottomRef = useRef<HTMLDivElement>(null);
  const rightBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
      )
        .fromTo(
          subLineRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 },
          "-=0.5"
        )
        .fromTo(
          italicRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          leftBottomRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.3"
        )
        .fromTo(
          rightBottomRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
          "-=0.8"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      {/* CENTER CONTENT */}
      <div className="flex flex-col items-center justify-center">
        <h1
          ref={titleRef}
          className="text-[14vw] leading-none font-black tracking-[-0.02em]"
        >
          ROUNAK
        </h1>

        <p
          ref={subLineRef}
          className="mt-4 text-[10px] tracking-[0.45em] text-muted uppercase"
        >
          I DESIGN AND BUILD PRODUCTS THAT
        </p>

        <h2
          ref={italicRef}
          className="mt-3 text-3xl md:text-5xl serif"
        >
          deliver real impact.
        </h2>
      </div>

      {/* LEFT BOTTOM - Stacked Layout */}
      <div
        ref={leftBottomRef}
        className="absolute bottom-8 left-8 md:bottom-12 md:left-12"
      >
        <div className="flex flex-col items-center gap-2">
          {/* Icon Circle */}
          <div className="relative">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center group-hover:border-primary/50 transition-all duration-300">
              <i className="ri-map-pin-line text-primary text-xl md:text-2xl"></i>
            </div>
            {/* Pulse Ring */}
            <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Text Stack */}
          <div className="text-center">
            <p className="text-[10px] tracking-[0.2em] text-muted uppercase mb-1">
              Location
            </p>
            <p className="text-sm md:text-base font-medium text-foreground">
              Kolkata, India
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT BOTTOM - Stacked Layout */}
      <div
        ref={rightBottomRef}
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12"
      >
        <div className="flex flex-col items-center gap-2">
          {/* Icon Circle */}
          <div className="relative group">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center group-hover:border-primary/50 transition-all duration-300">
              <i className="ri-stack-line text-primary text-xl md:text-2xl"></i>
            </div>
            {/* Pulse Ring */}
            <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Text Stack */}
          <div className="text-center">
            <p className="text-[10px] tracking-[0.2em] text-muted uppercase mb-1">
              Expertise
            </p>
            <p className="text-sm md:text-base font-medium text-foreground">
              Full Stack <span className="text-primary">&</span> Design
            </p>
          </div>
        </div>
      </div>

      {/* Optional: Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"></div>
    </section>
  );
}