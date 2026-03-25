"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "@/libs/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface StatItem {
  value: string;
  label: string;
  suffix?: string;
}

const stats: StatItem[] = [
  { value: "5+", label: "Years Experience", suffix: "" },
  { value: "50+", label: "Projects Delivered", suffix: "" },
  { value: "98%", label: "Client Satisfaction", suffix: "%" },
  { value: "24/7", label: "Support Available", suffix: "" },
];

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  color: string;
}

const services: ServiceItem[] = [
  {
    icon: "ri-flashlight-line",
    title: "Lightning Fast",
    description: "Optimized performance with sub-second load times and smooth interactions.",
    color: "from-amber-500/20 to-primary/20",
  },
  {
    icon: "ri-palette-line",
    title: "Pixel Perfect",
    description: "Meticulous attention to detail with responsive designs across all devices.",
    color: "from-primary/20 to-amber-500/20",
  },
  {
    icon: "ri-code-s-slash-line",
    title: "Clean Code",
    description: "Maintainable, scalable architecture with best practices and documentation.",
    color: "from-amber-500/20 to-primary/20",
  },
  {
    icon: "ri-rocket-line",
    title: "Fast Deployment",
    description: "Streamlined CI/CD pipelines for rapid, reliable production releases.",
    color: "from-primary/20 to-amber-500/20",
  },
];

export default function AboutParallax() {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxBgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const floatingElementsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Parallax background effect - moves slower than scroll
      if (parallaxBgRef.current && sectionRef.current) {
        gsap.to(parallaxBgRef.current, {
          y: -(sectionRef.current.offsetHeight * 0.3),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        });
      }

      // Floating elements parallax with different speeds
      floatingElementsRef.current.forEach((el, index) => {
        if (!el || !sectionRef.current) return;
        const speed = 0.1 + index * 0.05;
        gsap.to(el, {
          y: sectionRef.current.offsetHeight * 0.2 * speed,
          x: (index % 2 === 0 ? 1 : -1) * 50 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2,
            invalidateOnRefresh: true,
          },
        });
      });

      // Main content reveal animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "top 30%",
          toggleActions: "play none none reverse",
          onEnter: () => setIsInView(true),
          onLeaveBack: () => setIsInView(false),
        },
      });

      if (titleRef.current) {
        tl.fromTo(
          titleRef.current,
          { y: 60, opacity: 0, filter: "blur(8px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" }
        );
      }

      if (subtitleRef.current) {
        tl.fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.6"
        );
      }

      if (descriptionRef.current) {
        tl.fromTo(
          descriptionRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        );
      }

      if (statsRef.current && statsRef.current.children) {
        tl.fromTo(
          statsRef.current.children,
          { y: 40, opacity: 0, stagger: 0.1 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "back.out(0.8)" },
          "-=0.3"
        );
      }

      if (servicesRef.current && servicesRef.current.children) {
        tl.fromTo(
          servicesRef.current.children,
          { y: 50, opacity: 0, stagger: 0.1 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: "power3.out" },
          "-=0.2"
        );
      }

      // Individual service card hover animations
      if (servicesRef.current && servicesRef.current.children) {
        const serviceCards = Array.from(servicesRef.current.children);
        serviceCards.forEach((card) => {
          const cardEl = card as HTMLElement;
          const serviceIcon = cardEl.querySelector(".service-icon");
          const serviceGlow = cardEl.querySelector(".service-glow");
          
          const hoverTimeline = gsap.timeline({ paused: true });
          
          hoverTimeline.to(cardEl, {
            y: -8,
            duration: 0.3,
            ease: "power2.out",
          });
          
          if (serviceIcon) {
            hoverTimeline.to(
              serviceIcon,
              {
                scale: 1.1,
                duration: 0.3,
                ease: "back.out(0.5)",
              },
              0
            );
          }
          
          if (serviceGlow) {
            hoverTimeline.to(
              serviceGlow,
              {
                opacity: 1,
                scale: 1,
                duration: 0.3,
              },
              0
            );
          }
          
          cardEl.addEventListener("mouseenter", () => hoverTimeline.play());
          cardEl.addEventListener("mouseleave", () => hoverTimeline.reverse());
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-32 lg:py-40 overflow-hidden bg-background"
    >
      {/* Parallax Background Layer */}
      <div
        ref={parallaxBgRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none"
      >
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl animate-pulse-slow animation-delay-1000" />
        <div className="absolute top-2/3 left-1/3 w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-pulse-slow animation-delay-2000" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--primary) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }} />
        </div>
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) floatingElementsRef.current[i] = el;
            }}
            className="absolute"
            style={{
              top: `${15 + (i * 10)}%`,
              left: i % 2 === 0 ? `${5 + (i * 8)}%` : 'auto',
              right: i % 2 !== 0 ? `${5 + ((i - 1) * 8)}%` : 'auto',
              opacity: 0.15,
            }}
          >
            {i % 3 === 0 ? (
              <div className="w-12 h-12 rounded-full border border-primary/30 animate-spin-slow" />
            ) : i % 3 === 1 ? (
              <div className="w-8 h-8 rotate-45 border border-primary/20" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary/10 blur-md" />
            )}
          </div>
        ))}
      </div>

      {/* Main Content Container */}
      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-block mb-6">
            <span className="px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary text-xs tracking-wider font-medium">
              ✦ ABOUT ME ✦
            </span>
          </div>
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            Crafting Digital
            <span className="block bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent mt-2">
              Excellence
            </span>
          </h2>
          <p
            ref={subtitleRef}
            className="mt-6 text-base md:text-lg text-foreground/70 max-w-2xl mx-auto"
          >
            I&apos;m Rounak — a full-stack developer and designer who bridges the gap between
            beautiful aesthetics and robust functionality.
          </p>
        </div>

        {/* Description Grid */}
        <div
          ref={descriptionRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-24"
        >
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold tracking-tight">
              <span className="text-primary">01.</span> The Philosophy
            </h3>
            <p className="text-foreground/70 leading-relaxed">
              Every great product starts with a story. I believe in creating digital experiences
              that don&apos;t just function flawlessly but also resonate emotionally with users.
              My approach combines technical precision with creative intuition.
            </p>
            <div className="pt-4">
              <div className="flex items-center gap-3 text-primary group cursor-pointer">
                <span className="text-sm font-medium tracking-wide">MORE ABOUT MY PROCESS</span>
                <i className="ri-arrow-right-line group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold tracking-tight">
              <span className="text-primary">02.</span> The Approach
            </h3>
            <p className="text-foreground/70 leading-relaxed">
              I work end-to-end — from concept to deployment. Whether it&apos;s architecting scalable
              backends or crafting pixel-perfect frontends, I ensure every detail is polished.
              Collaboration and clear communication are at the heart of my workflow.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              {["React", "Next.js", "TypeScript", "Node.js", "Tailwind", "GSAP"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-mono text-primary/80 bg-primary/5 rounded-full border border-primary/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-24"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 group"
            >
              <p className="text-3xl md:text-4xl font-bold text-primary group-hover:scale-105 transition-transform duration-300">
                {stat.value}
                {stat.suffix}
              </p>
              <p className="text-xs text-foreground/60 mt-2 tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Services Section */}
        <div
          ref={servicesRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {services.map((service, index) => (
            <div
              key={index}
              className="relative group p-6 md:p-8 rounded-2xl bg-card/40 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-500 overflow-hidden cursor-pointer"
            >
              {/* Glow Effect on Hover */}
              <div className="service-glow absolute inset-0 opacity-0 bg-gradient-to-br from-primary/5 via-transparent to-amber-500/5 transition-opacity duration-500 pointer-events-none" />
              
              <div className="relative z-10">
                <div className="service-icon w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <i className={`${service.icon} text-2xl text-primary`} />
                </div>
                <h3 className="text-xl font-semibold mb-3 tracking-tight">
                  {service.title}
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
              
              {/* Animated Border on Hover */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-amber-500 group-hover:w-full transition-all duration-500 ease-out" />
            </div>
          ))}
        </div>

        {/* CTA Divider */}
        <div className="mt-24 pt-12 border-t border-border/30 text-center">
          <p className="text-foreground/50 text-sm tracking-wide">
            ✦ Available for freelance & full-time opportunities ✦
          </p>
        </div>
      </div>

      {/* Custom scroll-triggered style for parallax smoothness */}
      <style jsx>{`
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
}