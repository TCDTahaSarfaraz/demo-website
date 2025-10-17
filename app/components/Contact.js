'use client'

import React from "react";
import { motion } from "framer-motion";
import { LampContainer } from "../components/ui/lamp";
// 'useInView' is not needed here, as GSAP's ScrollTrigger handles this logic.
import { gsap } from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const formRef = React.useRef(null);
  
  React.useEffect(() => {
    // This guard prevents re-animation in development
    if (formRef.current.hasAttribute('data-animated')) return;
    formRef.current.setAttribute('data-animated', 'true');
    
    // GSAP animation for the form using ScrollTrigger
    gsap.from(formRef.current, {
        scrollTrigger: {
            trigger: formRef.current,
            start: "top 85%", 
            toggleActions: "play none none none"
        },
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out'
    });
  }, []);

  return (
    <section id="contact" className="bg-black">
      <LampContainer>
        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl">
          Let's build the future, <br /> together.
        </motion.h1>
      </LampContainer>

      {/* --- Contact Form Section --- */}
      <div ref={formRef} className="bg-black text-white pt-12 pb-24 px-6 -mt-40 relative z-10">
          <div className="max-w-xl mx-auto">
              <form className="space-y-6">
                  <input type="text" placeholder="Full Name" className="w-full bg-gray-900/80 border border-gray-700 rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"/>
                  <input type="email" placeholder="Email Address" className="w-full bg-gray-900/80 border border-gray-700 rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"/>
                  <textarea placeholder="Your message..." className="w-full bg-gray-900/80 border border-gray-700 rounded-md p-3 h-32 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all"></textarea>
                  <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 font-semibold py-3 rounded-md hover:opacity-90 transition-opacity shadow-lg">
                      Send Message
                  </button>
              </form>
          </div>
      </div>
    </section>
  );
}

export default Contact;