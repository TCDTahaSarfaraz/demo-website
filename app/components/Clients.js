// File: app/components/Clients.js - NO CHANGES NEEDED

'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Clients.css';

gsap.registerPlugin(ScrollTrigger);

const clients = [
    { name: 'OpenAI', logoSrc: '/openai.svg' },
    { name: 'Amazon', logoSrc: '/amazon.svg' },
    { name: 'Google', logoSrc: '/google.svg' },
    { name: 'Anthropic', logoSrc: '/anthropic.svg' },
    { name: 'Marriott', logoSrc: '/marriott.svg' },
    { name: 'Shopify', logoSrc: '/shopify.svg' },
    { name: 'Airbnb', logoSrc: '/airbnb.svg' },
    { name: 'URBN', logoSrc: '/urbn.svg' },
];

const ClientLogo = ({ src, name }) => (
    <div className="client-logo-wrapper">
        <Image
            src={src}
            alt={`${name} logo`}
            width={140} 
            height={40}
            className="client-logo"
        />
    </div>
);

const Clients = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".client-logo-wrapper", {
                scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
                opacity: 0, y: 30, stagger: 0.1, duration: 0.8,
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="clients" className="bg-slate-50 dark:bg-slate-900/70 py-24 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* --- Call to Action Form --- */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 max-w-2xl mx-auto">
                    <input type="email" placeholder="Email address" 
                        className="w-full sm:w-auto flex-grow px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-ring focus:outline-none"/>
                    <button className="w-full sm:w-auto flex-shrink-0 bg-stripe-dark text-white dark:bg-primary-foreground dark:text-primary font-semibold px-6 py-3 rounded-lg hover:bg-opacity-90 transition">
                        Start now →
                    </button>
                </div>
                
                {/* --- Logo Grid --- */}
                <div className="grid grid-cols-2 items-center gap-x-8 gap-y-12 sm:grid-cols-4 lg:gap-x-12 lg:gap-y-16">
                    {clients.map(({ name, logoSrc }) => (
                        <ClientLogo key={name} name={name} src={logoSrc} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Clients;