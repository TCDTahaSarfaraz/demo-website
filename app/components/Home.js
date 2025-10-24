// app/page.js or app/components/Home.js
'use client';

import { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Lazy load the animation component
const HeroAnimation = lazy(() => import('./HeroAnimation'));

// Framer Motion variants for the text
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Home() {
  return (
    <section
      id="home"
      className="relative w-full h-screen min-h-[800px] flex items-center bg-[#0d1120] text-white overflow-hidden"
    >
      <div className="absolute inset-0 z-0 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:36px_36px]" />

      <motion.div
        className="container mx-auto relative z-10 grid md:grid-cols-2 gap-10 lg:gap-16 items-center px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <div className="text-center md:text-left">
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
          >
            Complete, fully
            <br />
            configurable
            <br />
            <span className="text-indigo-400">AI Agent</span> system
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-lg mx-auto md:mx-0 text-base lg:text-lg text-slate-300 leading-relaxed"
          >
            Our platform is the only complete, configurable AI Agent System in customer service—empowering teams to customize, test, and continuously improve through a no-code experience.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
          >
            <button className="group w-full sm:w-auto px-6 py-3 bg-white text-black font-semibold rounded-md hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-2 shadow-lg">
              Start free trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-6 py-3 font-semibold rounded-md text-slate-300 hover:text-white hover:bg-slate-800/50 hover:scale-105 transition-all duration-300">
              View demo
            </button>
          </motion.div>
        </div>

        <div className="relative w-full h-[450px] lg:h-[500px]">
          <Suspense fallback={<div className="w-full h-full" />}>
            <HeroAnimation />
          </Suspense>
        </div>
      </motion.div>
    </section>
  );
}