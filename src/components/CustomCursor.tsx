"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const follower = followerRef.current;

    if (!dot || !follower) return;

    // 🧠 Mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      gsap.to(dot, {
        x: clientX,
        y: clientY,
        duration: 0.08,
      });

      gsap.to(follower, {
        x: clientX,
        y: clientY,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 🎯 Hover elements (typed properly)
    const hoverEls = document.querySelectorAll<HTMLElement>("button, a");

    // 🟢 Handlers (so we can remove them later)
    const handleEnter = () => {
      gsap.to(follower, { scale: 1.6, duration: 0.25 });
    };

    const handleLeave = (el: HTMLElement) => {
      gsap.to(follower, { scale: 1, duration: 0.25 });

      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.3,
      });
    };

    const handleMove = (el: HTMLElement) => (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();

      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;

      gsap.to(el, {
        x: (relX - rect.width / 2) * 0.15,
        y: (relY - rect.height / 2) * 0.15,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // 🧲 Attach events
    hoverEls.forEach((el) => {
      const moveHandler = handleMove(el);

      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", () => handleLeave(el));
      el.addEventListener("mousemove", moveHandler);
    });

    // 🧹 Cleanup (VERY IMPORTANT)
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);

      hoverEls.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", () => handleLeave(el));
        el.removeEventListener("mousemove", handleMove(el));
      });
    };
  }, []);

  return (
    <>
      {/* DOT */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-foreground rounded-full pointer-events-none z-[9999]"
      />

      {/* FOLLOWER */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full 
        bg-foreground/10 
        backdrop-blur-md 
        border border-foreground/20 
        shadow-[0_0_25px_rgba(255,255,255,0.08)] 
        pointer-events-none z-[9998]"
      />
    </>
  );
}