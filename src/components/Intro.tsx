"use client";

import { useEffect, useRef } from "react";
import gsap from "@/libs/gsap";

export default function Intro() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Letter animation
      gsap.fromTo(
        lettersRef.current,
        { y: 120, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.04,
          duration: 1.1,
          ease: "power4.out",
        }
      );

      // Subtitle animation
      gsap.fromTo(
        ".subtitle",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          delay: 0.8,
          duration: 1,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const name = "ROUNAK NATTA".split("");

  return (
    <section
      ref={containerRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* BACKGROUND TEXT */}
      <h1 className="absolute text-[14vw] font-bold opacity-[0.05] whitespace-nowrap select-none pointer-events-none">
        ROUNAK NATTA
      </h1>

      {/* FOREGROUND TEXT */}
      <h1 className="text-5xl md:text-7xl font-bold flex flex-wrap justify-center z-10">
        {name.map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              if (el) lettersRef.current[i] = el;
            }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>

      {/* SUBTITLE */}
      <p className="subtitle mt-6 text-muted text-lg text-center z-10">
        Full Stack Developer • SaaS Builder • Problem Solver
      </p>
    </section>
  );
}