// app/components/HeroAnimation.js
'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Globe, TestTube2, BrainCircuit, Rocket, ClipboardCheck } from 'lucide-react';

// --- Data for the four pods with PRECISE SVG coordinates ---
const PODS_DATA = [
  {
    label: 'ANALYZE',
    Icon: BrainCircuit,
    x: 255, y: 45,
  },
  {
    label: 'DEPLOY',
    Icon: Rocket,
    x: 490, y: 150,
  },
  {
    label: 'TEST',
    Icon: TestTube2,
    x: 260, y: 260,
  },
  {
    label: 'TRAIN',
    Icon: ClipboardCheck,
    x: 10, y: 150,
  },
];

export default function HeroAnimation() {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const runningEllipsePath = '#running-ellipse';
      const solidEllipsePath = '#solid-ellipse-guide'; // New element to animate
      const dashLength = 12;

      // --- 1. ENTRANCE ANIMATION: Now with the solid guide line ---
      const introTl = gsap.timeline({ delay: 0.3 });
      
      introTl
        .from('.central-globe', { 
            scale: 0.5, opacity: 0, duration: 0.8, ease: 'back.out(1.7)' 
        })
        // First, fade in the solid guide line
        .from(solidEllipsePath, {
            opacity: 0,
            duration: 1.0,
            ease: 'power2.inOut'
        }, "-=0.6")
        // Then, draw the running dotted line over it
        .from(runningEllipsePath, { 
            strokeDashoffset: -200, opacity: 0, duration: 1.2, ease: 'power2.inOut' 
        }, "-=0.8")
        .from('.hero-pod-wrapper', { 
            scale: 0.8, opacity: 0, rotation: -15, duration: 0.6, ease: 'power2.out', stagger: 0.1 
        }, "-=0.8");

      // --- 2. CONTINUOUS "RUNNING" LINE ANIMATION ---
      gsap.to(runningEllipsePath, {
        strokeDashoffset: -dashLength, duration: 1.2, repeat: -1, ease: 'none',
      });
      
      // --- 3. SUBTLE "BREATHING" ANIMATION ON PODS ---
      gsap.to('.hero-pod-wrapper', {
        scale: 1.03, duration: 3, yoyo: true, repeat: -1, ease: 'sine.inOut',
        stagger: { each: 0.5, from: 'random' }
      });

    }, containerRef);

    // --- 4. CLEANUP FUNCTION ---
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="relative w-[400px] h-[250px] md:w-[500px] md:h-[300px]">
        <svg
          viewBox="0 0 500 300"
          className="absolute inset-0 w-full h-full overflow-visible"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ... Gradient Definition ... */}
          <defs>
            <linearGradient id="orbitGradientFinal" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#4f46e5" stopOpacity="1" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* NEW: THE SOLID "GUIDE" LINE */}
          {/* This path sits underneath the dotted line to provide structure. */}
          <path
            id="solid-ellipse-guide"
            d="M 10 150 C 10 10, 490 10, 490 150 C 490 290, 10 290, 10 150 Z"
            stroke="#334155" // slate-700, a subtle dark gray
            strokeWidth="1.5"
          />
          
          {/* THE STRETCHED DOTTED LINE */}
          <path
            id="running-ellipse"
            d="M 10 150 C 10 10, 490 10, 490 150 C 490 290, 10 290, 10 150 Z"
            stroke="url(#orbitGradientFinal)" strokeWidth="2" strokeDasharray="4 8"
          />

          {/* CENTRAL GLOBE - NOW INSIDE SVG FOR CONSISTENCY */}
          <g className="central-globe">
            <foreignObject x="210" y="110" width="80" height="80">
              <div className="w-20 h-20 bg-slate-900/50 rounded-full flex items-center justify-center border border-slate-700 shadow-inner">
                <Globe className="w-12 h-12 text-slate-500" />
              </div>
            </foreignObject>
          </g>
          
          {/* --- GENERATING PODS INSIDE THE SVG USING <foreignObject> --- */}
          {PODS_DATA.map(({ label, Icon, x, y }) => (
            <g key={label} className="hero-pod-wrapper">
              <foreignObject x={x - 50} y={y - 17} width="100" height="34">
                 <div className="flex items-center justify-center gap-2 rounded-full bg-slate-900/80 backdrop-blur-sm border border-slate-700 px-3 py-1.5 shadow-lg transition-all duration-300 hover:scale-110 hover:border-slate-500 cursor-pointer">
                    <Icon className="h-4 w-4 text-indigo-400" />
                    <span className="text-xs font-semibold text-slate-200">{label}</span>
                 </div>
              </foreignObject>
            </g>
          ))}
        </svg>
      </div>

      <div className="absolute bottom-4 right-4 max-w-[200px] text-right text-[10px] leading-tight text-slate-500">
        <p className="font-bold">[1] BUILT ON FIN AI ENGINE™</p>
        <p>
          Fin combines the only complete, fully configurable AI Agent System{' '}
          <a href="#" className="underline transition hover:text-white">
            Learn more
          </a>
        </p>
      </div>
    </div>
  );
}