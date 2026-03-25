"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="fixed top-4 left-0 w-full z-50 flex justify-center px-4">
      <div className="w-full max-w-7xl flex items-center justify-between">
        
        {/* LEFT */}
        <div className="flex items-center gap-3 
        bg-card/60 backdrop-blur-xl border border-border 
        rounded-full px-4 py-2
        shadow-[0_8px_30px_rgba(0,0,0,0.2)]
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]
        transition-all duration-300">

          <Image
            src="/images/logo.webp"
            alt="logo"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />

          <div className="hidden md:block leading-tight">
            <p className="text-[10px] tracking-[0.3em] text-muted uppercase">
              Creative Engineer
            </p>
            <p className="text-xs text-primary font-medium">
              Building the future
            </p>
          </div>
        </div>

        {/* CENTER NAV */}
        <div className="hidden md:flex items-center 
        bg-card/60 backdrop-blur-xl border border-border 
        rounded-full px-2 py-1
        shadow-[0_8px_30px_rgba(0,0,0,0.2)]
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]
        transition-all duration-300">

          {["Home", "About", "Work", "Blogs", "More"].map((item, i) => (
            <button
              key={i}
              className={`px-5 py-2 text-sm rounded-full transition ${
                item === "Home"
                  ? "bg-foreground text-background shadow-sm"
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
        rounded-full px-3 py-2
        shadow-[0_8px_30px_rgba(0,0,0,0.2)]
        hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]
        transition-all duration-300">

          {/* THEME */}
          <button
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-card transition"
          >
            🌙
          </button>

          {/* CTA */}
          <button className="px-4 py-1.5 rounded-full border border-border text-sm hover:bg-card transition">
            Book a Call
          </button>

          {/* CMD */}
          <div className="w-9 h-9 flex items-center justify-center rounded-full border border-border text-sm">
            ⌘
          </div>
        </div>

      </div>
    </nav>
  );
}