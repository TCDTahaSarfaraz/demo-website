'use client'

import { motion, useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

// This is the main container for the horizontal scroll animation.
export const AnimatedTestimonials = ({ testimonials }) => {
    // The targetRef is attached to the tall outer section. Framer Motion will track
    // how far the user has scrolled within this section.
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: targetRef });
    
    // useTransform maps the vertical scroll progress (from 0 to 1) to a horizontal
    // translation (from 1% to -95%). This creates the "scrolling gallery" effect.
    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        <section ref={targetRef} className="relative h-[300vh]">
            {/* The outer div is sticky, so it stays in place while the user scrolls through the 300vh section */}
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} {...testimonial} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

// This is the individual testimonial card.
const Card = ({ quote, name, designation, src }) => {
    return (
        <div className="relative h-[450px] w-[350px] shrink-0 overflow-hidden rounded-2xl bg-gray-900/50 p-8 shadow-lg border border-gray-700 backdrop-blur-sm">
             <div className="absolute inset-0 z-0 opacity-10">
                <Image src={src} alt={name} layout="fill" objectFit="cover" />
            </div>
            <div className="relative z-10 flex flex-col justify-between h-full">
                <p className="text-lg italic text-gray-300">"{quote}"</p>
                <div className="flex items-center gap-4">
                     <Image
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                        src={src}
                        alt={name}
                    />
                    <div>
                        <p className="font-semibold text-white">{name}</p>
                        <p className="text-sm text-gray-400">{designation}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};