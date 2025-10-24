// File: app/components/ContactSection.js (Modernized & Professional)
'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { BackgroundGradient } from '../../components/ui/shadcn-io/background-gradient'; // <-- ADJUST PATH IF NEEDED
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactSection = () => {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    const containerVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.6, 0.05, 0.01, 0.9],
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <section
            id="contact"
            ref={sectionRef}
            className="relative w-full py-24 sm:py-32 overflow-hidden bg-slate-950"
        >
            {/* Ambient Background */}
            <motion.div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: 'linear-gradient(to right, #1e3a8a, #4c1d95, #86198f)',
                    backgroundSize: '200% 200%',
                }}
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute inset-0 z-[1] bg-black/50 backdrop-blur-sm" />

            <div className="relative z-10 container mx-auto max-w-7xl px-6 lg:px-8">
                {/* Main Content inside the Gradient Card */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    <BackgroundGradient
                        className="rounded-[22px] w-full p-8 md:p-10 bg-slate-900/80 backdrop-blur-md"
                        containerClassName="w-full"
                    >
                        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
                            {/* Left Side: Form */}
                            <motion.div variants={itemVariants} className="flex flex-col">
                                <h2 className="text-3xl font-bold text-white mb-2">Get in Touch</h2>
                                <p className="text-gray-300 mb-8">
                                    Have a project in mind or just want to say hi? Fill out the form, and we'll get back to you.
                                </p>
                                <form className="space-y-5 flex-grow flex flex-col">
                                    <input type="text" placeholder="Full Name" required className="w-full p-3 bg-slate-800/50 border border-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                                    <input type="email" placeholder="Email Address" required className="w-full p-3 bg-slate-800/50 border border-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" />
                                    <textarea placeholder="Your Message" required className="w-full p-3 bg-slate-800/50 border border-slate-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all flex-grow" rows="5"></textarea>
                                    <button type="submit" className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold p-3 rounded-lg hover:opacity-90 shadow-lg shadow-indigo-500/30 transition-opacity duration-300">
                                        Send Message
                                    </button>
                                </form>
                            </motion.div>

                            {/* Right Side: Details & Map */}
                            <motion.div variants={itemVariants} className="space-y-10">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-6">Contact Details</h3>
                                    <div className="space-y-5 text-gray-300">
                                        <div className="flex items-start gap-4">
                                            <Mail className="w-6 h-6 text-indigo-300 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="font-semibold text-white">Email</p>
                                                <a href="mailto:hi@untitledui.com" className="hover:text-indigo-300 transition-colors">hi@untitledui.com</a>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <Phone className="w-6 h-6 text-indigo-300 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="font-semibold text-white">Phone</p>
                                                <p>+1 (555) 000-0000</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <MapPin className="w-6 h-6 text-indigo-300 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="font-semibold text-white">Office Location</p>
                                                <p>100 Smith Street, Collingwood VIC 3066 AU</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="relative w-full h-80 rounded-2xl overflow-hidden border border-slate-700">
                                     <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.401590081113!2d67.00464987401142!3d24.850130145673422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06f2a60f3b%3A0xd6863f65ab088107!2sTechnoCom%20Developments!5e0!3m2!1sen!2s!4v1761140136766!5m2!1sen!2s"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="grayscale"
                                    ></iframe>
                                </div>
                            </motion.div>
                        </div>
                    </BackgroundGradient>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactSection;