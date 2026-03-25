"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* 🔥 PRELOADER */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      <main className="pt-24 bg-background text-foreground transition-colors duration-300">
        
        {/* HERO / CONTENT */}
        <section className="h-screen flex items-center justify-center">
          <h1 className="text-6xl font-bold">Welcome 👋</h1>
        </section>

        <section className="h-screen flex items-center justify-center border-t border-border">
          <h2 className="text-3xl">Scroll ↓</h2>
        </section>

      </main>
    </>
  );
}