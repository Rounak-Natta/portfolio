"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";

const navItems = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Work", id: "work" },
    { label: "Blogs", id: "blogs" },
    { label: "More", id: "more" },
];

export default function Navbar() {
    const { theme, setTheme } = useTheme();
    const [active, setActive] = useState("Home");
    const [open, setOpen] = useState(false);

    const indicatorRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const mobileMenuRef = useRef<HTMLDivElement>(null);

    // 🔥 SCROLL FUNCTION
    const handleScroll = (id: string, label: string) => {
        const el = document.getElementById(id);
        if (!el) return;

        const y =
            el.getBoundingClientRect().top +
            window.scrollY;

        window.scrollTo({
            top: y,
            behavior: "smooth",
        });

        setActive(label);
    };

    // 🔥 ACTIVE SECTION TRACKING
    useEffect(() => {
        const sections = navItems.map((item) =>
            document.getElementById(item.id)
        );

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const found = navItems.find(
                            (item) => item.id === entry.target.id
                        );
                        if (found) setActive(found.label);
                    }
                });
            },
            { threshold: 0.6 }
        );

        sections.forEach((sec) => sec && observer.observe(sec));

        return () => observer.disconnect();
    }, []);

    // 🔥 SLIDING INDICATOR
    useEffect(() => {
        const index = navItems.findIndex((i) => i.label === active);
        const el = itemRefs.current[index];

        if (!el || !indicatorRef.current) return;

        gsap.to(indicatorRef.current, {
            x: el.offsetLeft,
            width: el.offsetWidth,
            duration: 0.35,
            ease: "power3.out",
        });
    }, [active]);

    // 📱 MOBILE MENU ANIMATION
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
                    gsap.set(menu, { display: "none" });
                },
            });
        }
    }, [open]);

    return (
        <>
            {/* NAV */}
            <nav className="fixed top-4 left-0 w-full z-50 flex justify-center px-4">
                <div className="w-full max-w-7xl flex items-center justify-between">

                    {/* LEFT */}
                    <div className="flex items-center gap-3 bg-card/60 backdrop-blur-xl border border-border rounded-full px-4 py-2 shadow-md">
                        <Image
                            src="/images/logo.webp"
                            alt="logo"
                            width={40}
                            height={40}
                            className="rounded-full"
                            priority
                        />
                    </div>

                    {/* CENTER */}
                    <div className="relative hidden md:flex items-center bg-card/60 backdrop-blur-xl border border-border rounded-full px-2 py-1 shadow-md">

                        <div
                            ref={indicatorRef}
                            className="absolute top-1 bottom-1 left-0 bg-foreground rounded-full z-0"
                        />

                        {navItems.map((item, i) => (
                            <button
                                key={item.label}
                                ref={(el) => {
                                    itemRefs.current[i] = el;
                                }} onClick={() => handleScroll(item.id, item.label)}
                                className={`relative z-10 px-5 py-2 text-sm rounded-full transition ${active === item.label
                                    ? "text-background"
                                    : "text-muted hover:text-foreground"
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-3 bg-card/60 backdrop-blur-xl border border-border rounded-full px-3 py-2 shadow-md">

                        <button
                            onClick={() =>
                                setTheme(theme === "dark" ? "light" : "dark")
                            }
                            className="w-9 h-9 flex items-center justify-center rounded-full"
                        >
                            🌙
                        </button>

                        <button
                            onClick={() => setOpen((prev) => !prev)}
                            className="md:hidden w-9 h-9 flex items-center justify-center border border-border rounded-full text-lg"
                        >
                            {open ? "✕" : "☰"}
                        </button>
                    </div>
                </div>
            </nav>

            {/* MOBILE MENU */}
            <div
                ref={mobileMenuRef}
                className="fixed inset-0 bg-background z-40 hidden flex-col items-center justify-center gap-10"
            >
                {navItems.map((item) => (
                    <button
                        key={item.label}
                        onClick={() => {
                            handleScroll(item.id, item.label);
                            setOpen(false);
                        }}
                        className="text-3xl font-semibold"
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </>
    );
}