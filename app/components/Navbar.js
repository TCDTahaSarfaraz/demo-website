// File: app/components/Navbar.js - DEFINITIVE RESPONSIVE VERSION

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeSwitcher from './ThemeSwitcher';

const MenuToggle = ({ isOpen, toggle }) => (
    <motion.button aria-label={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen} onClick={toggle}
        className="relative z-[100] w-8 h-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        animate={isOpen ? "open" : "closed"}
    >
        <motion.svg width="24" height="24" viewBox="0 0 24 24"
             className={isOpen ? "text-foreground" : "text-stripe-dark dark:text-foreground"} >
            <motion.path stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" variants={{ closed: { d: "M 4 6 L 20 6" }, open: { d: "M 6 18 L 18 6" } }} transition={{ duration: 0.4 }} />
            <motion.path stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" d="M 4 12 L 20 12" variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }} transition={{ duration: 0.2 }} />
            <motion.path stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" variants={{ closed: { d: "M 4 18 L 20 18" }, open: { d: "M 6 6 L 18 18" } }} transition={{ duration: 0.4 }} />
        </motion.svg>
    </motion.button>
);

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const navLinks = [ { name: 'Home', href: '#home' }, { name: 'About', href: '#about' }, { name: 'Testimonials', href: '#testimonials' }, { name: 'Career', href: '#career' }, { name: 'Contact', href: '#contact' }];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const navBg = scrolled ? 'bg-background/80 shadow-md backdrop-blur-lg border-b border-border/50' : 'bg-transparent';

    return (
        <>
            <motion.nav
                initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.7, ease: [0.6, 0.05, 0.01, 0.9] }}
                className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${navBg}`} >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <Link href="#home" className="text-xl sm:text-2xl font-bold text-stripe-dark dark:text-foreground">MyWebsite</Link>
                    
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link key={link.name} href={link.href} className="text-muted-foreground hover:text-foreground font-medium transition-colors">
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <ThemeSwitcher />
                        <Link href="#contact" className="bg-stripe-dark text-white dark:bg-primary-foreground dark:text-primary font-semibold px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity">
                            Contact Sales
                        </Link>
                    </div>

                    <div className="md:hidden flex items-center space-x-4">
                        <ThemeSwitcher />
                        <MenuToggle isOpen={menuOpen} toggle={() => setMenuOpen(!menuOpen)} />
                    </div>
                </div>
            </motion.nav>

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="fixed inset-0 z-[90] bg-background flex flex-col items-center justify-center space-y-8" >
                        {navLinks.map((link, i) => (
                            <motion.div key={link.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 + i * 0.1 }} >
                                <Link href={link.href} className="text-3xl font-semibold text-foreground" onClick={() => setMenuOpen(false)}>
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;