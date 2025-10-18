// File: app/components/Home.js - DEFINITIVE RESPONSIVE VERSION

'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);
    const globeContainerRef = useRef(null);
    const heroContentRef = useRef(null);

    useLayoutEffect(() => {
        const mm = ScrollTrigger.matchMedia();

        mm.add({ isDesktop: "(min-width: 768px)", isMobile: "(max-width: 767px)" }, (context) => {
            const { isDesktop } = context.conditions;
            const ctx = gsap.context(() => {
                gsap.to(globeContainerRef.current, {
                    scale: isDesktop ? 6 : 2.5,
                    ease: "power1.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom bottom", scrub: 1 }
                });
                gsap.to(heroContentRef.current, {
                    opacity: 0,
                    filter: isDesktop ? 'blur(8px)' : 'none',
                    ease: "power1.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "center center", scrub: 1 }
                });
            }, sectionRef);
            return () => ctx.revert();
        });
        return () => mm.revert();
    }, []);

    return (
        <section id="home" ref={sectionRef} className="relative h-[200vh] bg-background overflow-hidden">
            <div ref={contentRef} className="sticky top-0 h-screen w-full flex items-center justify-center text-center">
                <div ref={globeContainerRef} className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.1)_0%,transparent_80%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(99,91,255,0.15)_0%,transparent_80%)]" />
                    <Image src="/globe.svg" alt="Abstract globe" fill priority className="object-cover opacity-10 dark:opacity-20" />
                </div>
                <div ref={heroContentRef} className="relative z-10 p-4 sm:p-6 flex flex-col items-center">
                    <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
                        <span className="hero-title block text-transparent bg-clip-text bg-gradient-to-r from-stripe-purple to-pink-600 dark:from-purple-400 dark:to-pink-400">
                            Build for growth
                        </span>
                    </h1>
                    <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-lg md:max-w-2xl mx-auto">
                        The world’s most successful platforms are built on our infrastructure. We’ve created a fully integrated suite of powerful developer tools to help you grow your business.
                    </p>
                    <button className="bg-stripe-dark text-white dark:bg-primary-foreground dark:text-primary px-7 sm:px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300">
                        Start now
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Home;