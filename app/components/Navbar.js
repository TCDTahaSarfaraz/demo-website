'use client'

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import ThemeSwitcher from './ThemeSwitcher'; // <-- Import our clean component

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Career', href: '#career' },
        { name: 'Contact', href: '#contact' },
    ];

    // Theme-aware styles for the navbar background
    const navBg = scrolled
        ? 'bg-white/80 dark:bg-black/80 shadow-lg backdrop-blur-md'
        : 'bg-transparent';

    return (
        <motion.nav
            initial={{ y: -80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: [0.6, 0.05, -0.01, 0.9] }}
            className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${navBg}`}
        >
            <div className="container mx-auto px-4 py-3 flex flex-wrap justify-between items-center">
                <Link href="#home" className="text-2xl font-bold text-stripe-dark dark:text-white tracking-tight drop-shadow-sm">MyWebsite</Link>
                
                {/* Desktop nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link key={link.name} href={link.href} className="text-gray-600 dark:text-gray-300 hover:text-stripe-dark dark:hover:text-white font-medium transition-colors duration-200">
                            {link.name}
                        </Link>
                    ))}
                </div>
                
                <div className="hidden md:flex items-center space-x-4">
                    <ThemeSwitcher />
                    <Link href="#contact" className="bg-stripe-dark dark:bg-white text-white dark:text-black font-semibold px-5 py-2 rounded-full hover:opacity-90 transition-opacity">
                        Contact Sales
                    </Link>
                </div>
                
                {/* Mobile menu button & switcher */}
                <div className="md:hidden flex items-center space-x-4">
                     <ThemeSwitcher />
                    <button
                        aria-label="Open menu"
                        className="text-gray-800 dark:text-white focus:outline-none"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"></path></svg>
                    </button>
                </div>
                
                {/* Mobile nav menu */}
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-full left-0 w-full bg-white dark:bg-black py-4 flex flex-col items-center space-y-4 md:hidden shadow-lg border-t border-gray-200 dark:border-gray-800"
                    >
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} className="text-gray-700 dark:text-gray-200 font-semibold text-lg" onClick={() => setMenuOpen(false)}>
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
};

export default Navbar;