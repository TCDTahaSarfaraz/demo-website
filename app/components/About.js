'use client'

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- All Required SVG Icon Components ---
const PaymentsIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2z" stroke="#a78bfa" strokeWidth="2"/><path d="M4 10h16" stroke="#a78bfa" strokeWidth="2"/></svg>;
const ConnectIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14m-7-7h14" stroke="#60a5fa" strokeWidth="2"/></svg>;
const TerminalIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="16" height="16" rx="2" stroke="#34d399" strokeWidth="2"/><path d="m9 12 3 3 3-3" stroke="#34d399" strokeWidth="2"/></svg>;
const TaxIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 14.5l2 2 4-4" stroke="#f472b6" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="12" r="9" stroke="#f472b6" strokeWidth="2"/></svg>;
const RadarIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v3m0 12v3M5.6 5.6l2.1 2.1m8.5 8.5 2.1 2.1" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="12" r="3" stroke="#ef4444" strokeWidth="2"/></svg>;
const BGIcon = () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#E0E6EB" strokeWidth="1.5" strokeLinejoin="round"/></svg>;

// --- Reusable Block Components ---
const ProductBlock = ({ id, children, className = '', icon }) => (
    <div id={id} className={`product-block ${className} absolute flex items-center justify-center w-20 h-20 bg-white border border-gray-200/80 rounded-xl shadow-lg opacity-0`}>
        <div className="text-center text-stripe-dark"><div className="flex justify-center mb-1.5">{icon}</div><span className="text-xs font-semibold">{children}</span></div>
    </div>
);
const BackgroundIcon = ({ i }) => <div key={i} className="w-20 h-20 flex items-center justify-center opacity-60"><BGIcon/></div>;

// --- Main About Component ---
const About = () => {
    const sectionRef = useRef(null);
    const isAnimationSetup = useRef(false);
    
    useEffect(() => {
        if (isAnimationSetup.current) return;
        isAnimationSetup.current = true;

        const q = gsap.utils.selector(sectionRef);

        const lines = q('.animated-line');
        lines.forEach(line => gsap.set(line, { strokeDasharray: line.getTotalLength(), strokeDashoffset: line.getTotalLength() }));
        
        gsap.set(q('.product-block'), { opacity: 0, scale: 0.9 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 50%',
                end: 'bottom center',
                toggleActions: 'play none none reverse',
            },
            defaults: { duration: 1, ease: 'power2.out' },
        });

        // Helper functions for a cleaner timeline
        const reveal = () => ({ opacity: 1, scale: 1, stagger: 0.2 });
        const hide = () => ({ opacity: 0, scale: 0.9, duration: 0.4 });
        const draw = () => ({ strokeDashoffset: 0 });

        // --- SCENE 1: Payments, Connect, Terminal ---
        tl.add("scene1")
          .to([q('#payments'), q('#connect'), q('#terminal')], reveal(), "scene1")
          .to(q('#line-p-c'), draw(), "scene1+=0.3")
          .to(q('#line-p-t'), draw(), "<0.1");
        
        // --- SCENE 2: Payments, Tax, Radar ---
        tl.add("scene2", "+=1.5")
          .to([q('#connect'), q('#terminal'), q('.line-s1')], hide(), "scene2")
          .to([q('#tax'), q('#radar')], reveal(), "scene2+=0.3")
          .to(q('#line-p-tax'), draw(), "scene2+=0.5")
          .to(q('#line-p-radar'), draw(), "<0.1");
          
    }, []);

    return (
        <section id="about" ref={sectionRef} className="section-container">
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 px-6">
                
                <div className="lg:w-2/5 text-center lg:text-left">
                    <h3 className="mb-4 text-md font-semibold text-stripe-purple">MODULAR SOLUTIONS</h3>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">A fully integrated suite of financial products</h2>
                </div>
                
                <div className="lg:w-3/5 w-full h-[60vh] flex items-center justify-center">
                    <div className="relative w-[500px] h-[500px]">

                        <div className="absolute inset-0 grid grid-cols-4 gap-4">
                            {Array.from({ length: 16 }).map((_, i) => <BackgroundIcon i={i}/>)}
                        </div>

                        <ProductBlock id="payments" className="top-[190px] left-[190px]" icon={<PaymentsIcon/>}>Payments</ProductBlock>
                        <ProductBlock id="connect" className="top-[190px] left-[0px]" icon={<ConnectIcon/>}>Connect</ProductBlock>
                        <ProductBlock id="terminal" className="top-[380px] left-[190px]" icon={<TerminalIcon/>}>Terminal</ProductBlock>
                        <ProductBlock id="tax" className="top-[0px] left-[190px]" icon={<TaxIcon/>}>Tax</ProductBlock>
                        <ProductBlock id="radar" className="top-[380px] left-[380px]" icon={<RadarIcon/>}>Radar</ProductBlock>
                        
                        <svg className="absolute top-0 left-0 w-full h-full overflow-visible" fill="none">
                            <defs>
                                <linearGradient id="g-blue-purple"><stop stopColor="#60a5fa"/><stop offset="1" stopColor="#a78bfa"/></linearGradient>
                                <linearGradient id="g-green-purple"><stop stopColor="#34d399"/><stop offset="1" stopColor="#a78bfa"/></linearGradient>
                                <linearGradient id="g-pink-purple"><stop stopColor="#f472b6"/><stop offset="1" stopColor="#a78bfa"/></linearGradient>
                                <linearGradient id="g-red-purple"><stop stopColor="#ef4444" stopColorOpacity="0.8"/><stop offset="1" stopColor="#a78bfa"/></linearGradient>
                            </defs>
                            
                            <path id="line-p-c" className="animated-line line-s1" d="M 190 230 C 130 230, 90 230, 80 230" stroke="url(#g-blue-purple)" strokeWidth="3" strokeLinecap="round"/>
                            <path id="line-p-t" className="animated-line line-s1" d="M 230 270 C 230 330, 230 370, 230 380" stroke="url(#g-green-purple)" strokeWidth="3" strokeLinecap="round"/>
                            
                            <path id="line-p-tax" className="animated-line line-s2" d="M 230 190 C 230 130, 230 90, 230 80" stroke="url(#g-pink-purple)" strokeWidth="3" strokeLinecap="round"/>
                            <path id="line-p-radar" className="animated-line line-s2" d="M 270 260 C 330 300, 370 350, 380 380" stroke="url(#g-red-purple)" strokeWidth="3" strokeLinecap="round"/>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;