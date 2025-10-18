// File: app/components/About.js - FINAL, STABLE VERSION

'use client'

import ProductSuiteScene from './ProductSuiteScene';

const About = () => (
    // The main section container
    <section id="about" className="section-container py-16 sm:py-24">
        {/* Responsive container with padding */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* The two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10 items-center">

                {/* Left Column: Text Content */}
                <div className="text-center lg:text-left">
                    <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-stripe-purple">MODULAR SOLUTIONS</h3>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stripe-dark dark:text-white leading-tight">
                        A fully integrated suite of financial products
                    </h2>
                </div>

                {/* Right Column: Animation Container. This is now robust and simple. */}
                <div className="w-full">
                    <ProductSuiteScene />
                </div>

            </div>
        </div>
    </section>
);

export default About;