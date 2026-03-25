"use client";

import { useState } from "react";
import Preloader from "@/components/Preloader";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* 🔥 PRELOADER */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* 🔥 NAVBAR */}
      <Navbar />

      {/* 🔥 MAIN CONTENT */}
      <main className="bg-background text-foreground transition-colors duration-300">

        {/* HERO */}
        <section id="home" className="scroll-mt-24">
          <Hero />
        </section>

        {/* ABOUT */}
        <section id="about" className="scroll-mt-24">
          <About />
        </section>

        {/* PLACEHOLDER SECTIONS */}
        <section id="work" className="scroll-mt-24 h-screen flex items-center justify-center">
          <h2 className="text-4xl font-bold">Work Section</h2>
        </section>

        <section id="blogs" className="scroll-mt-24 h-screen flex items-center justify-center">
          <h2 className="text-4xl font-bold">Blogs Section</h2>
        </section>

        <section id="more" className="scroll-mt-24 h-screen flex items-center justify-center">
          <h2 className="text-4xl font-bold">More Section</h2>
        </section>

      </main>
    </>
  );
}