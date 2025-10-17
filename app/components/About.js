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


const ProductBlock = ({ id, children, className = '', icon }) => (
    <div id={id} className={`product-block ${className} absolute flex items-center justify-center w-20 h-20 bg-white border border-gray-200/80 rounded-xl shadow-xl transition-shadow duration-300 hover:shadow-2xl`}>
        <div className="text-center text-stripe-dark"><div className="flex justify-center mb-1.5">{icon}</div><span className="text-xs font-semibold">{children}</span></div>
    </div>
);
const BackgroundIcon = () => <div className="w-20 h-20 flex items-center justify-center opacity-60"><BGIcon/></div>;

const About = () => {
    const sectionRef = useRef(null);
    const isAnimationSetup = useRef(false);
    
    useEffect(() => {
        if (isAnimationSetup.current) return;
        isAnimationSetup.current = true;

        const q = gsap.utils.selector(sectionRef);
        
        const paths = q('.animated-line');
        const pathData = {};
        paths.forEach(p => { 
            const len = p.getTotalLength();
            pathData[p.id] = { path: p, length: len };
            gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });
        
        gsap.set(q('.product-block'), { opacity: 0, scale: 0.95 });
        gsap.to(q('.product-block'), {
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
            opacity: 1, scale: 1, stagger: 0.1, duration: 0.8, ease: 'power2.out',
        });
        
        const loopTl = gsap.timeline({
            repeat: -1,
            defaults: { duration: 1, ease: 'none' },
            scrollTrigger: { trigger: sectionRef.current, start: 'top center', toggleActions: 'play pause resume pause' }
        });
        
        const run = (lineId, gradId) => {
            loopTl.fromTo(pathData[lineId].path, { strokeDashoffset: pathData[lineId].length }, { strokeDashoffset: 0, ease: 'power1.inOut', duration: 1.2 }, '<')
                  .fromTo(q(`#${gradId} stop`)[0], { attr: { offset: "0" } }, { attr: { offset: "1" }, duration: 1.2, ease: 'power1.inOut' }, "<")
                  .fromTo(q(`#${gradId} stop`)[1], { attr: { offset: "0" } }, { attr: { offset: "1" }, duration: 1.2, ease: 'power1.inOut' }, "<")
                  .to(pathData[lineId].path, { strokeDashoffset: -pathData[lineId].length, ease: 'power1.in', duration: 0.8 }, '>');
        };

        run('line-p-c', 'g-blue-purple');
        run('line-p-t', 'g-green-purple');
        run('line-p-tax', 'g-pink-purple');
        run('line-p-radar', 'g-red-purple');

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

                        <ProductBlock id="payments" className="top-[190px] left-[190px]" icon={<PaymentsIcon/>}>Payments</ProductBlock>
                        <ProductBlock id="connect" className="top-[190px] left-[0px]" icon={<ConnectIcon/>}>Connect</ProductBlock>
                        <ProductBlock id="terminal" className="top-[380px] left-[190px]" icon={<TerminalIcon/>}>Terminal</ProductBlock>
                        <ProductBlock id="tax" className="top-[0px] left-[190px]" icon={<TaxIcon/>}>Tax</ProductBlock>
                        <ProductBlock id="radar" className="top-[380px] left-[380px]" icon={<RadarIcon/>}>Radar</ProductBlock>
                        
                        <svg className="absolute top-0 left-0 w-full h-full overflow-visible" fill="none">
                            <defs>
                                 <linearGradient id="g-blue-purple"><stop stopColor="#60a5fa"/><stop stopColor="#a78bfa" offset="0"/></linearGradient>
                                <linearGradient id="g-green-purple"><stop stopColor="#34d399"/><stop stopColor="#a78bfa" offset="0"/></linearGradient>
                                <linearGradient id="g-pink-purple"><stop stopColor="#f472b6"/><stop stopColor="#a78bfa" offset="0"/></linearGradient>
                                <linearGradient id="g-red-purple"><stop stopColor="#ef4444" stopOpacity="0.8"/><stop stopColor="#a78bfa" offset="0"/></linearGradient>
                            </defs>
                            
                            <path id="line-p-c" className="animated-line" d="M 190 230 C 130 230, 90 230, 80 230" stroke="url(#g-blue-purple)" strokeWidth="3" strokeLinecap="round"/>
                            <path id="line-p-t" className="animated-line" d="M 230 270 C 230 330, 230 370, 230 380" stroke="url(#g-green-purple)" strokeWidth="3" strokeLinecap="round"/>
                            <path id="line-p-tax" className="animated-line" d="M 230 190 C 230 130, 230 90, 230 80" stroke="url(#g-pink-purple)" strokeWidth="3" strokeLinecap="round"/>
                            <path id="line-p-radar" className="animated-line" d="M 270 260 C 330 300, 370 350, 380 380" stroke="url(#g-red-purple)" strokeWidth="3" strokeLinecap="round"/>
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;