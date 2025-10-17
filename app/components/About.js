'use client'

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- All Required SVG Icon Components ---
const PaymentsIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 6H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2z" stroke="#a78bfa" strokeWidth="2"/><path d="M4 10h16" stroke="#a78bfa" strokeWidth="2"/></svg>;
const ConnectIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 5v14m-7-7h14" stroke="#60a5fa" strokeWidth="2"/></svg>;
const TerminalIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="16" height="16" rx="2" stroke="#34d399" strokeWidth="2"/><path d="m9 12 3 3 3-3" stroke="#34d399" strokeWidth="2"/></svg>;
const BillingIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="#fde047" strokeWidth="2" strokeLinejoin="round"/><path d="M14 2v6h6" stroke="#fde047" strokeWidth="2"/></svg>;
const CapitalIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="12" width="18" height="8" rx="2" stroke="#22c55e" strokeWidth="2"/><path d="M3 8V6a2 2 0 012-2h14a2 2 0 012 2v2" stroke="#22c55e" strokeWidth="2"/></svg>;
const TreasuryIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 14h8M8 10h8m-4 8V6" stroke="#06b6d4" strokeWidth="2"/><path d="M3 20V4a2 2 0 012-2h14a2 2 0 012 2v16l-4-4H7l-4 4z" stroke="#06b6d4" strokeWidth="2"/></svg>;
const IssuingIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="6" width="18" height="12" rx="2" stroke="#8b5cf6" strokeWidth="2"/><circle cx="8" cy="15" r="1" fill="#8b5cf6"/></svg>;
const RadarIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3v3m0 12v3M5.6 5.6l2.1 2.1m8.5 8.5 2.1 2.1" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="12" r="3" stroke="#ef4444" strokeWidth="2"/></svg>;
const BGIcon = () => <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#E0E6EB" strokeWidth="1.5" strokeLinejoin="round"/></svg>;


const ProductBlock = ({ id, children, className = '', icon }) => (
    <div id={id} className={`product-block ${className} absolute flex items-center justify-center w-20 h-20 bg-white border border-gray-200/80 rounded-xl shadow-xl transition-shadow duration-300 hover:shadow-2xl`}>
        <div className="text-center text-stripe-dark"><div className="icon-wrapper flex justify-center mb-1.5">{icon}</div><span className="text-xs font-semibold">{children}</span></div>
    </div>
);
const BackgroundIcon = () => <div className="w-20 h-20 flex items-center justify-center opacity-60"><BGIcon/></div>;


const About = () => {
    const sectionRef = useRef(null);
    
    useEffect(() => {
        if (sectionRef.current.hasAttribute('data-animated')) return;
        sectionRef.current.setAttribute('data-animated', 'true');
        
        const q = gsap.utils.selector(sectionRef);

        const paths = q('.animated-line');
        const pathData = {};
        paths.forEach(p => { 
            pathData[p.id] = { path: p, length: p.getTotalLength() };
            gsap.set(p, { strokeDasharray: pathData[p.id].length, strokeDashoffset: pathData[p.id].length });
        });

        const glow = (targetId) => {
            const icon = q(`${targetId} .icon-wrapper svg`)[0];
            gsap.fromTo(icon, 
                { filter: 'drop-shadow(0 0 2px #fff)' }, 
                { filter: 'drop-shadow(0 0 8px #a78bfa) drop-shadow(0 0 12px #a78bfa)', 
                  duration: 0.5, yoyo: true, repeat: 1, ease: 'power2.inOut' }
            );
        };

        gsap.set(q('.product-block'), { opacity: 0, scale: 0.95 });
        gsap.to(q('.product-block'), {
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
            opacity: 1, scale: 1, stagger: 0.05, duration: 0.8, ease: 'power2.out',
        });
        
        const createLoopingTimeline = (sequence) => {
            const tl = gsap.timeline({ repeat: -1, defaults: { duration: 1, ease: 'none' } });

            sequence.forEach(({ line, target }, index) => {
                const lineData = pathData[line];
                const prevLineData = index > 0 ? pathData[sequence[index-1].line] : null;

                tl.to(lineData.path, { strokeDashoffset: 0, duration: 1, ease: 'power1.inOut' }, prevLineData ? "<" : ">0.5")
                  .call(glow, [target], null, '-=0.3');

                if (prevLineData) {
                    tl.to(prevLineData.path, { strokeDashoffset: -prevLineData.length, duration: 0.8, ease: 'power1.in' }, '<');
                }
            });

            const finalLineData = pathData[sequence[sequence.length-1].line];
            tl.to(finalLineData.path, { strokeDashoffset: -finalLineData.length, duration: 0.8, ease: 'power1.in' }, ">-0.2");
            return tl;
        };
        
        const mainSequence = [
            { line: 'line-c-cap', target: '#capital' },
            { line: 'line-cap-tre', target: '#treasury' },
            { line: 'line-tre-b', target: '#billing' },
            { line: 'line-b-p', target: '#payments' },
            { line: 'line-p-term', target: '#terminal' },
        ];
        
        const secondarySequence = [
            { line: 'line-term-rad', target: '#radar' },
            { line: 'line-rad-iss', target: '#issuing' },
            { line: 'line-b-iss', target: '#issuing' }, // Uses the new path
            { line: 'line-iss-c', target: '#connect' },
        ];

        const masterTl = gsap.timeline({
            scrollTrigger: { trigger: sectionRef.current, start: 'top center', toggleActions: 'play pause resume pause' }
        });

        masterTl.add(createLoopingTimeline(mainSequence));
        masterTl.add(createLoopingTimeline(secondarySequence), ">-3"); // Overlap timelines for non-stop action

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
                            {Array.from({ length: 16 }).map((_, i) => <BackgroundIcon key={i} />)}
                        </div>

                        {/* All 9 Product Blocks in the final 3x3 layout */}
                        <ProductBlock id="connect" className="top-[80px] left-[0px]" icon={<ConnectIcon/>}>Connect</ProductBlock>
                        <ProductBlock id="capital" className="top-[0px] left-[190px]" icon={<CapitalIcon/>}>Capital</ProductBlock>
                        <ProductBlock id="treasury" className="top-[0px] left-[380px]" icon={<TreasuryIcon/>}>Treasury</ProductBlock>
                        <ProductBlock id="payments" className="top-[190px] left-[190px]" icon={<PaymentsIcon/>}>Payments</ProductBlock>
                        <ProductBlock id="billing" className="top-[190px] left-[380px]" icon={<BillingIcon/>}>Billing</ProductBlock>
                        <ProductBlock id="terminal" className="top-[380px] left-[0px]" icon={<TerminalIcon/>}>Terminal</ProductBlock>
                        <ProductBlock id="issuing" className="top-[380px] left-[190px]" icon={<IssuingIcon/>}>Issuing</ProductBlock>
                        <ProductBlock id="radar" className="top-[380px] left-[380px]" icon={<RadarIcon/>}>Radar</ProductBlock>
                        
                        <svg className="absolute top-0 left-0 w-full h-full overflow-visible" fill="none">
                            <defs>
                                <linearGradient id="g1"><stop stopColor="#60a5fa"/><stop offset="1" stopColor="#22c55e"/></linearGradient>
                                <linearGradient id="g2"><stop stopColor="#22c55e"/><stop offset="1" stopColor="#06b6d4"/></linearGradient>
                                <linearGradient id="g3"><stop stopColor="#06b6d4"/><stop offset="1" stopColor="#fde047"/></linearGradient>
                                <linearGradient id="g4"><stop stopColor="#fde047"/><stop offset="1" stopColor="#a78bfa"/></linearGradient>
                                <linearGradient id="g5"><stop stopColor="#a78bfa"/><stop offset="1" stopColor="#34d399"/></linearGradient>
                                <linearGradient id="g6"><stop stopColor="#34d399"/><stop offset="1" stopColor="#ef4444"/></linearGradient>
                                <linearGradient id="g7"><stop stopColor="#ef4444"/><stop offset="1" stopColor="#8b5cf6"/></linearGradient>
                                <linearGradient id="g8"><stop stopColor="#fde047"/><stop offset="1" stopColor="#8b5cf6"/></linearGradient>
                                <linearGradient id="g9"><stop stopColor="#8b5cf6"/><stop offset="1" stopColor="#60a5fa"/></linearGradient>
                            </defs>
                            
                            {/* --- New paths, including Terminal-Radar and Billing-Issuing --- */}
                            <path id="line-c-cap" className="animated-line" d="M 80 120 H 190" stroke="url(#g1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            <path id="line-cap-tre" className="animated-line" d="M 270 40 H 380" stroke="url(#g2)" strokeWidth="3" strokeLinecap="round"/>
                            <path id="line-tre-b" className="animated-line" d="M 420 80 V 190" stroke="url(#g3)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            <path id="line-b-p" className="animated-line" d="M 380 230 H 270" stroke="url(#g4)" strokeWidth="3" strokeLinecap="round"/>
                            <path id="line-p-term" className="animated-line" d="M 190 270 L 120 270 L 120 420 L 80 420" stroke="url(#g5)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            <path id="line-term-rad" className="animated-line" d="M 80 420 H 380" stroke="url(#g6)" strokeWidth="3" strokeLinecap="round"/>
                            <path id="line-rad-iss" className="animated-line" d="M 380 420 H 270" stroke="url(#g7)" strokeWidth="3" strokeLinecap="round"/>
                            <path id="line-b-iss" className="animated-line" d="M 420 270 V 340 L 230 340 V 380" stroke="url(#g8)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            <path id="line-iss-c" className="animated-line" d="M 190 380 L 190 120 L 80 120" stroke="url(#g9)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;