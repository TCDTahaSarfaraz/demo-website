// File: app/components/Testimonials.js - NEW MODERNIZED VERSION
'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Quote } from 'lucide-react';

// --- Testimonials Data ---
const testimonials = [
    { name: "@john", title: "CEO, Innovate Inc.", quote: "The results were outstanding. Their dedication and exceptional service are second to none.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" },
    { name: "@sarah", title: "Marketing Director", quote: "Working with them was a game-changer. Incredibly efficient, professional, and dedicated to our success.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
    { name: "@rayana", title: "Lead Designer", quote: "They consistently provide an outstanding service that is both reliable and creatively inspiring. Highly recommended!", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rayana" },
    { name: "@emily", title: "Product Manager", quote: "This team exceeds expectations every single time. Their attention to detail is remarkable.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily" },
    { name: "@priya", title: "Startup Founder", quote: "From sleek designs to exceptional customer service, they delivered on all fronts. A true partner.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" },
    { name: "@harsh", title: "CTO, Tech Solutions", quote: "Their designs are not just visually exceptional, the underlying quality and code are absolutely unmatched.", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Harsh" },
];

// --- 1. A SUPERIOR, MODERNIZED TESTIMONIAL CARD UI ---
const TestimonialCard = ({ name, title, quote, avatar }) => {
    return (
        <div className="flex-shrink-0 w-full bg-white/5 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/10 flex flex-col justify-between">
            <Quote className="w-10 h-10 text-indigo-300/50 mb-4" strokeWidth={1.5} />
            <p className="text-lg text-gray-200 font-light leading-relaxed flex-grow">
                {quote}
            </p>
            <div className="flex items-center gap-4 mt-8 pt-6 border-t border-white/10">
                <img src={avatar} alt={name} className="w-14 h-14 object-cover rounded-full bg-white/20 p-1" />
                <div>
                    <p className="font-bold text-lg text-white">{name}</p>
                    <p className="text-sm text-indigo-200">{title}</p>
                </div>
            </div>
        </div>
    );
};


// --- 2. THE MAIN COMPONENT WITH ADVANCED DRAG & SNAPPING LOGIC ---
const Testimonials = () => {
    const sectionRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    const headerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
        },
    };
    
    // This function handles the snapping and inertia
    const onDragEnd = (event, info) => {
        const { offset, velocity } = info;
        const swipeThreshold = 50; // Minimum drag distance to trigger a slide
        const swipePower = Math.abs(velocity.x) * 0.1;

        if (offset.x < -swipeThreshold || swipePower > 50) {
            // Swipe Left
            setCurrentIndex((prev) => Math.min(prev + 1, testimonials.length - 1));
        } else if (offset.x > swipeThreshold || swipePower > 50) {
            // Swipe Right
            setCurrentIndex((prev) => Math.max(prev - 1, 0));
        }
    };

    return (
        <section ref={sectionRef} id="testimonials" className="relative w-full py-24 md:py-32 overflow-hidden bg-slate-900">
            {/* The beautiful gradient background */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'linear-gradient(to right, #1e3a8a, #4c1d95, #86198f)',
                    backgroundSize: '200% 200%',
                }}
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute inset-0 z-[1] bg-black/40" />
            
            <div className="relative z-10 container mx-auto px-4 md:px-8">
                {/* Section Header */}
                <motion.div
                    className="text-center max-w-3xl mx-auto"
                    variants={headerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    <p className="font-semibold text-indigo-300 tracking-wider">VOICES OF SUCCESS</p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 text-white">
                        What Our Partners Are Saying
                    </h2>
                </motion.div>
                
                {/* The Draggable Carousel */}
                <div className="relative mt-20 max-w-xl mx-auto h-[450px]">
                    <motion.div
                        className="absolute inset-0 flex items-center"
                        animate={{ x: `-${currentIndex * 100}%` }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }} // This creates the SNAP animation
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }} // This defines the BOUNDS
                        onDragEnd={onDragEnd}
                        dragElastic={0.1}
                    >
                        {testimonials.map((testimonial, i) => (
                            <div key={i} className="flex-shrink-0 w-full h-full px-4">
                               <TestimonialCard {...testimonial} />
                            </div>
                        ))}
                    </motion.div>
                </div>
                
                {/* --- 3. UI IMPROVEMENT: PAGINATION DOTS --- */}
                <div className="flex justify-center gap-3 mt-8">
                    {testimonials.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                                currentIndex === i ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
                            }`}
                            aria-label={`Go to testimonial ${i + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;