'use client'

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const sectionRef = useRef(null);
  const globeContainerRef = useRef(null);
  const heroContentRef = useRef(null);

  useEffect(() => {
    // This guard prevents animations from re-initializing on hot reloads
    if (sectionRef.current.hasAttribute('data-animated')) return;
    sectionRef.current.setAttribute('data-animated', 'true');

    // --- The New Cinematic Scroll Animation Timeline ---
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current, // The trigger is the entire hero section
        pin: true,                   // Pins the section to the viewport
        scrub: 1,                    // Smoothly ties the animation to the scrollbar (1 second lag)
        start: "top top",            // Starts the animation when the top of the section hits the top of the viewport
        end: "+=1500",               // The animation will last for 1500 pixels of scroll distance
      },
      defaults: { ease: 'power2.out' }
    });

    // 1. Animate the globe: scale it up and move it for a parallax effect.
    tl.to(globeContainerRef.current, {
      scale: 6,
      y: "-30%",
    });

    // 2. Animate the hero content: fade it out and add a slight blur for a professional feel.
    // The "<" position parameter makes this animation happen AT THE SAME TIME as the one above.
    tl.to(heroContentRef.current, {
      opacity: 0,
      filter: 'blur(10px)',
    }, "<");
    
    // --- Professional Cleanup ---
    // This is crucial: it kills the animation when the component unmounts to prevent memory leaks.
    return () => {
      tl.kill(); // Kill the timeline and all its associated animations
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
    
  }, []);

  return (
    // The main section is now the trigger for our scroll animation
    <section id="home" ref={sectionRef} className="relative h-screen flex items-center justify-center text-center bg-white dark:bg-black overflow-hidden">
      
      {/* Container for the Globe - This is what we will scale and move */}
      <div ref={globeContainerRef} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(167,139,250,0.15)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(67,56,202,0.2)_0%,transparent_70%)]" />
        
        <Image
          src="/globe.svg"
          alt="Abstract globe illustration"
          fill
          priority
          className="globe-image object-cover w-full h-full opacity-10 dark:opacity-20"
          style={{ objectFit: "cover" }}
        />
      </div>
      
      {/* Container for the Text/Button Content - This is what we will fade out */}
      <div ref={heroContentRef} className="relative z-10 p-8 flex flex-col items-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          <span className="hero-title block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
            Build for growth
          </span>
        </h1>
        <p className="hero-subtitle text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
          The world’s most successful platforms and products are built on our infrastructure. We’ve created a fully integrated suite of powerful developer tools to help you grow your business.
        </p>
        <button className="hero-button bg-gray-900 text-white dark:bg-white dark:text-black px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300">
          Start now
        </button>
      </div>
    </section>
  );
};

export default Home;