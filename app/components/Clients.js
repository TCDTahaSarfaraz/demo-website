'use client'

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// A simple styled placeholder for logos.
const LogoPlaceholder = ({ text, className = '' }) => (
    <div className={`client-logo flex items-center justify-center h-16 text-3xl font-bold text-gray-500 hover:text-gray-900 transition-colors ${className}`}>
        {text}
    </div>
);

const Clients = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const q = gsap.utils.selector(sectionRef);
        gsap.from(q('.client-logo'), {
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
                once: true,
            },
            opacity: 0, y: 30, stagger: 0.1, duration: 0.8,
        });
    }, []);

    const clientLogos = [ "OpenAI", "amazon", "Google", "ANTHROPIC", "MARRIOTT", "shopify", "airbnb", "URBN" ];

    return (
        <section ref={sectionRef} id="clients" className="bg-white py-24 sm:py-32">
            <div className="container mx-auto px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-start gap-4 mb-20">
                    <input type="email" placeholder="Email address" className="w-full sm:w-auto flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"/>
                    <button className="w-full sm:w-auto bg-gray-900 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                        Start now &rarr;
                    </button>
                </div>
                <div className="mx-auto grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                    {clientLogos.map((logoText) => (
                        <LogoPlaceholder key={logoText} text={logoText} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Clients;