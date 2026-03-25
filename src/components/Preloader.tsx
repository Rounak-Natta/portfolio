"use client";

import { useEffect, useRef } from "react";
import gsap from "@/libs/gsap";

export default function Preloader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<HTMLSpanElement[]>([]);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.style.overflow = "auto";
          onComplete();
        },
      });

      // 🔢 Counter
      const obj = { value: 0 };

      tl.to(obj, {
        value: 100,
        duration: 1.6,
        ease: "power2.out",
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.innerText =
              String(Math.floor(obj.value)).padStart(2, "0") + "%";
          }
        },
      });

      // ✨ Letters reveal
      tl.fromTo(
        lettersRef.current,
        {
          y: 140,
          opacity: 0,
          filter: "blur(12px)",
        },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.035,
          duration: 1,
          ease: "power4.out",
        },
        "-=1.1"
      );

      // 🔍 Subtle zoom
      tl.fromTo(
        containerRef.current,
        { scale: 1.06 },
        {
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        },
        "<"
      );

      // 🍏 Apple-style exit

      // flash
      tl.to(containerRef.current, {
        filter: "brightness(1.2)",
        duration: 0.2,
      });

      // lift
      tl.to(containerRef.current, {
        scale: 1.1,
        y: "-40%",
        duration: 0.8,
        ease: "power3.inOut",
      });

      // exit
      tl.to(containerRef.current, {
        y: "-120%",
        duration: 0.9,
        ease: "power4.inOut",
      });
    }, containerRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = "auto";
    };
  }, [onComplete]);

  const name = "ROUNAK NATTA".split("");

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background text-foreground will-change-transform"
    >
      {/* 🎞️ GRAIN */}
      <div className="grain pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay" />

      {/* 🔢 COUNTER */}
      <div
        ref={counterRef}
        className="absolute top-8 right-8 text-sm text-muted tracking-widest"
      >
        00%
      </div>

      {/* 🧱 NAME */}
      <h1 className="text-5xl md:text-7xl font-bold flex flex-wrap justify-center">
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

      <p className="absolute bottom-8 text-xs text-muted tracking-[0.3em]">
        LOADING EXPERIENCE
      </p>
    </div>
  );
}