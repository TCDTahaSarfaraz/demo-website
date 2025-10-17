'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Testimonials', href: '/testimonials' },
        { name: 'Career', href: '/career' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black shadow-lg' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-white">MyWebsite</Link>
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link key={link.name} href={link.href} className="text-gray-300 hover:text-white transition-colors duration-200">
                            {link.name}
                        </Link>
                    ))}
                </div>
                <button className="hidden md:block bg-white text-black font-semibold px-5 py-2 rounded-md hover:bg-gray-200 transition-all">
                    Contact Sales
                </button>
            </div>
        </nav>
    );
};

export default Navbar;