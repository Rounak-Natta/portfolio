"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "@/libs/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subLineRef = useRef<HTMLParagraphElement>(null);
  const italicRef = useRef<HTMLHeadingElement>(null);
  const leftBottomRef = useRef<HTMLDivElement>(null);
  const rightBottomRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const [currentTime, setCurrentTime] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const isInitializedRef = useRef(false);

  // Generate particles
  const initParticles = useCallback(() => {
    const particles: Particle[] = [];
    const particleCount = 80;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        id: i,
        x: Math.random() * (canvasRef.current?.width || window.innerWidth),
        y: Math.random() * (canvasRef.current?.height || window.innerHeight),
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.3 + 0.1,
      });
    }
    
    particlesRef.current = particles;
  }, []);

  // Handle canvas resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }, [initParticles]);

  // Draw particles on canvas
  const drawParticles = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    particlesRef.current.forEach(particle => {
      // Move particles
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      
      // Wrap around edges
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;
      
      // Calculate distance from mouse
      const dx = mousePosition.x - particle.x;
      const dy = mousePosition.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 150;
      
      // Repel particles from cursor
      if (distance < maxDistance) {
        const angle = Math.atan2(dy, dx);
        const force = (maxDistance - distance) / maxDistance;
        const repelX = Math.cos(angle) * force * 2;
        const repelY = Math.sin(angle) * force * 2;
        
        particle.x -= repelX;
        particle.y -= repelY;
        
        // Increase particle size near cursor
        const tempSize = particle.size + force * 2;
        
        // Draw particle with glow effect
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, tempSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 162, 122, ${particle.opacity + force * 0.3})`;
        ctx.shadowBlur = force * 10;
        ctx.shadowColor = `rgba(200, 162, 122, 0.5)`;
        ctx.fill();
      } else {
        // Draw normal particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 162, 122, ${particle.opacity})`;
        ctx.shadowBlur = 0;
        ctx.fill();
      }
    });
    
    // Draw connections between nearby particles
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(200, 162, 122, 0.15)';
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const p1 = particlesRef.current[i];
        const p2 = particlesRef.current[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
  }, [mousePosition]);

  // Start animation - separate function that creates recursive animation loop
  const startAnimation = useCallback(() => {
    const animate = () => {
      drawParticles();
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [drawParticles]);

  // Handle mouse move
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  // Initialize everything in one effect
  useEffect(() => {
    // Only initialize once
    if (isInitializedRef.current) return;
    isInitializedRef.current = true;
    
    // Setup canvas and particles
    handleResize();
    
    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Start animation
    startAnimation();
    
    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);
    
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
          { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.2)" },
          "-=0.4"
        )
        .fromTo(
          rightBottomRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.2)" },
          "-=0.6"
        );
    }, containerRef);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      ctx.revert();
    };
  }, [handleResize, handleMouseMove, startAnimation]);

  // Update real-time clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: false 
      });
      setCurrentTime(formattedTime);
    };
    
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full flex flex-col items-center justify-center text-center px-6 overflow-hidden bg-background"
    >
      {/* Canvas for Interactive Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />
      
      {/* Static Gradient Overlay for Depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-primary/5 pointer-events-none z-[2]"></div>
      
      {/* Animated Grid Lines */}
      <div className="absolute inset-0 pointer-events-none z-[2]">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-slide-x"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-slide-x-reverse"></div>
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-slide-y"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-primary/20 to-transparent animate-slide-y-reverse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Storytelling Badge */}
        <div className="mb-8 inline-block animate-float">
          <div className="px-5 py-2.5 rounded-full bg-primary/15 backdrop-blur-sm border border-primary/30 shadow-lg">
            <span className="text-xs tracking-wider text-primary font-semibold">
              ✦ CRAFTING DIGITAL EXPERIENCES SINCE 2020 ✦
            </span>
          </div>
        </div>

        <h1
          ref={titleRef}
          className="text-[12vw] md:text-[10vw] lg:text-[8vw] leading-none font-black tracking-[-0.03em] bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent"
        >
          ROUNAK
        </h1>

        <p
          ref={subLineRef}
          className="mt-6 text-[11px] md:text-[12px] tracking-[0.3em] text-foreground/70 uppercase font-medium"
        >
          I DESIGN AND BUILD PRODUCTS THAT
        </p>

        <div className="relative mt-4">
          <h2
            ref={italicRef}
            className="text-2xl md:text-4xl lg:text-6xl serif relative inline-block text-foreground"
          >
            Deliver Real Impact.
            <span className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-glow"></span>
          </h2>
        </div>

        {/* Storytelling Stats */}
        <div className="mt-12 flex flex-wrap gap-6 md:gap-12 justify-center">
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-primary">5+</p>
            <p className="text-xs text-foreground/60 mt-1 tracking-wide">Years Experience</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-primary">50+</p>
            <p className="text-xs text-foreground/60 mt-1 tracking-wide">Projects Completed</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-primary">20+</p>
            <p className="text-xs text-foreground/60 mt-1 tracking-wide">Happy Clients</p>
          </div>
        </div>

      </div>

      {/* LEFT BOTTOM */}
      <div
        ref={leftBottomRef}
        className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-20"
      >
        <div className="flex flex-col items-center gap-2.5">
          <div className="relative group">
            <div className="w-11 h-11 md:w-13 md:h-13 rounded-full bg-primary/15 backdrop-blur-sm border border-primary/30 flex items-center justify-center group-hover:border-primary/60 transition-all duration-300 group-hover:scale-110">
              <i className="ri-map-pin-line text-primary text-xl md:text-2xl"></i>
            </div>
            <div className="absolute inset-0 rounded-full border border-primary/40 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="text-center">
            <p className="text-[9px] tracking-[0.2em] text-foreground/50 uppercase mb-1.5">
              Location
            </p>
            <p className="text-xs md:text-sm font-medium text-foreground">
              Kolkata, India
            </p>
            <p className="text-[10px] text-foreground/50 mt-1 font-mono tracking-wider">
              {currentTime}
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT BOTTOM */}
      <div
        ref={rightBottomRef}
        className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-20"
      >
        <div className="flex flex-col items-center gap-2.5">
          <div className="relative group">
            <div className="w-11 h-11 md:w-13 md:h-13 rounded-full bg-primary/15 backdrop-blur-sm border border-primary/30 flex items-center justify-center group-hover:border-primary/60 transition-all duration-300 group-hover:scale-110">
              <i className="ri-stack-line text-primary text-xl md:text-2xl"></i>
            </div>
            <div className="absolute inset-0 rounded-full border border-primary/40 animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="text-center">
            <p className="text-[9px] tracking-[0.2em] text-foreground/50 uppercase mb-1.5">
              Expertise
            </p>
            <p className="text-xs md:text-sm font-medium text-foreground">
              Full Stack <span className="text-primary">&</span> Design
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow z-10">
        <span className="text-[9px] text-foreground/50 tracking-[0.2em]">SCROLL</span>
        <div className="w-px h-10 bg-gradient-to-b from-primary to-transparent"></div>
      </div>
    </section>
  );
}