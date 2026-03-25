"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const navItems = ["Home", "About", "Work", "Blogs", "More"];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState("Home");
  const [open, setOpen] = useState(false);

  const indicatorRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // 🔥 Sliding indicator
  useEffect(() => {
    const index = navItems.indexOf(active);
    const el = itemRefs.current[index];

    if (!el || !indicatorRef.current) return;

    gsap.to(indicatorRef.current, {
      x: el.offsetLeft,
      width: el.offsetWidth,
      duration: 0.35,
      ease: "power3.out",
    });
  }, [active]);

  // 📱 Mobile menu animation (FIXED)
  useEffect(() => {
    const menu = mobileMenuRef.current;
    if (!menu) return;

    if (open) {
      document.body.style.overflow = "hidden";

      gsap.set(menu, { display: "flex" });

      gsap.fromTo(
        menu,
        { y: "-100%", opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          ease: "power4.out",
        }
      );
    } else {
      document.body.style.overflow = "auto";

      gsap.to(menu, {
        y: "-100%",
        opacity: 0,
        duration: 0.4,
        ease: "power4.inOut",
        onComplete: () => {
          gsap.set(menu, { display: "none" }); // ✅ FIXED
        },
      });
    }
  }, [open]);

  return (
    <>
      <nav className="fixed top-4 left-0 w-full z-50 flex justify-center px-4">
        <div className="w-full max-w-7xl flex items-center justify-between">

          {/* LEFT */}
          <div className="flex items-center gap-3 
          bg-card/60 backdrop-blur-xl border border-border 
          rounded-full px-4 py-2 shadow-md">

            <Image
              src="/images/logo.webp"
              alt="logo"
              width={40}
              height={40}
              className="rounded-full object-cover"
              priority
            />

            <div className="hidden md:block leading-tight">
              <p className="text-[10px] tracking-[0.3em] text-muted uppercase">
                Creative Engineer
              </p>
              <p className="text-xs text-primary font-medium">
                Building The Future
              </p>
            </div>
          </div>

          {/* CENTER NAV */}
          <div className="relative hidden md:flex items-center 
          bg-card/60 backdrop-blur-xl border border-border 
          rounded-full px-2 py-1 shadow-md">

            <div
              ref={indicatorRef}
              className="absolute top-1 bottom-1 left-0 bg-foreground rounded-full z-0"
            />

            {navItems.map((item, i) => (
              <button
                key={item}
                ref={(el) => {
                  itemRefs.current[i] = el;
                }}
                onClick={() => setActive(item)}
                className={`relative z-10 px-5 py-2 text-sm rounded-full transition ${
                  active === item
                    ? "text-background"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 
          bg-card/60 backdrop-blur-xl border border-border 
          rounded-full px-3 py-2 shadow-md">

            <button
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-card transition"
            >
              🌙
            </button>

            <button className="hidden md:block px-4 py-1.5 rounded-full border border-border text-sm hover:bg-card transition">
              Book a Call
            </button>

            <div className="hidden md:flex w-9 h-9 items-center justify-center rounded-full border border-border text-sm">
              ⌘
            </div>

            <button
              onClick={() => setOpen((prev) => !prev)}
              className="md:hidden w-9 h-9 flex items-center justify-center border border-border rounded-full text-lg"
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      {/* 📱 MOBILE MENU */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 bg-background z-40 hidden flex-col items-center justify-center gap-10"
      >
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => {
              setActive(item);
              setOpen(false);
            }}
            className="text-3xl font-semibold tracking-wide"
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
}