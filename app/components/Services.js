// File: app/components/Services.js (Modernized & Animated)
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BubbleBackground } from '../../components/animate-ui/components/backgrounds/bubble'; // <-- Make sure path is correct
import { Code, Layers, Megaphone, Workflow } from 'lucide-react'; // Example icons

// --- 1. NEW DATA FOR SERVICES ---
const servicesList = [
    {
        icon: <Code className="w-8 h-8 text-indigo-300" />,
        title: 'Web & App Development',
        description: 'We build fast, responsive, and secure digital experiences, from sleek websites to powerful web applications.',
    },
    {
        icon: <Layers className="w-8 h-8 text-rose-300" />,
        title: 'UI/UX Design',
        description: 'Our design process focuses on creating intuitive, beautiful, and user-friendly interfaces that drive engagement.',
    },
    {
        icon: <Megaphone className="w-8 h-8 text-amber-300" />,
        title: 'Digital Marketing',
        description: 'We craft data-driven marketing strategies that amplify your brand’s voice and connect you with your audience.',
    },
    {
        icon: <Workflow className="w-8 h-8 text-emerald-300" />,
        title: 'Process Automation',
        description: 'Streamline your operations with our custom automation solutions, saving you time and reducing costs.',
    },
];

// --- 2. MODERNIZED SERVICE CARD WITH ANIMATION VARIANTS ---
const ServiceCard = ({ icon, title, description, index }) => {
    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.15, // Staggered delay for each card
            }
        }
    };

    return (
        <motion.div
            variants={cardVariants}
            className="service-card bg-white/10 dark:bg-black/20 backdrop-blur-xl p-8 rounded-2xl border border-white/10 text-center flex flex-col items-center"
        >
            <div className="mb-6 bg-white/5 p-4 rounded-full">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <p className="text-gray-300 text-sm leading-relaxed flex-grow">{description}</p>
        </motion.div>
    );
};

// --- 3. MAIN SERVICES COMPONENT USING FRAMER MOTION ---
const Services = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    return (
        <section id="services" ref={sectionRef} className="relative py-24 sm:py-32 overflow-hidden bg-slate-950">
            {/* The background component */}
            <BubbleBackground interactive={true} className="absolute inset-0 z-0" />
            
            {/* The main content, layered on top */}
            <div className="relative z-10 container mx-auto max-w-7xl px-6 lg:px-8">
                <motion.div
                    className="max-w-3xl mx-auto text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                        Solutions Designed for <span className="text-indigo-300">Growth</span>
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-300">
                        We provide the digital toolkit your business needs to thrive. Explore our core services designed to deliver tangible results.
                    </p>
                </motion.div>

                <motion.div
                    className="services-grid mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {servicesList.map((service, index) => (
                        <ServiceCard key={index} {...service} index={index} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Services;