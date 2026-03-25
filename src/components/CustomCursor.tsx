"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    const move = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.1,
      });

      gsap.to(follower, {
        x: clientX,
        y: clientY,
        duration: 0.5,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", move);

    // 🔥 hover scaling
    const hoverEls = document.querySelectorAll("button, a");

    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        gsap.to(follower, { scale: 1.8, duration: 0.3 });
      });

      el.addEventListener("mouseleave", () => {
        gsap.to(follower, { scale: 1, duration: 0.3 });
      });
    });

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <>
      {/* DOT */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-foreground rounded-full pointer-events-none z-[9999]"
      />

      {/* 3D FOLLOWER */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full 
        bg-foreground/10 backdrop-blur-md 
        border border-foreground/20 
        shadow-[0_0_30px_rgba(255,255,255,0.15)] 
        pointer-events-none z-[9998]"
      />
    </>
  );
}