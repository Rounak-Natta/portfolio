"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import Hero from "@/components/sections/Hero";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* 🔥 PRELOADER */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* 🔥 MAIN CONTENT */}
      <main className="bg-background text-foreground transition-colors duration-300">
        
        {/* HERO */}
        <Hero />

        {/* NEXT SECTION */}
        <section className="min-h-screen flex items-center justify-center border-t border-border">
          <h2 className="text-3xl font-semibold">
            More coming soon 🚀
          </h2>
        </section>

      </main>
    </>
  );
}