'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ContactSection = () => {
  const sectionRef = useRef(null);
  const linksRef = useRef(null);
  const formMapRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
      defaults: { ease: 'power3.out' },
    });

    gsap.fromTo(
      linksRef.current,
      { opacity: 0, y: 50, scale: 0.9, boxShadow: '0 0 0 rgba(0,0,0,0)' },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        boxShadow: '0 10px 20px rgba(0,0,0,0.2)', 
        duration: 1.5,
        filter: 'drop-shadow(0 0 10px rgba(147, 51, 234, 0.3))'
      }
    );

    tl.fromTo(
      formMapRef.current,
      { opacity: 0, y: 50, scale: 0.9, boxShadow: '0 0 0 rgba(0,0,0,0)' },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        boxShadow: '0 10px 20px rgba(0,0,0,0.2)', 
        duration: 1.5,
        filter: 'drop-shadow(0 0 10px rgba(147, 51, 234, 0.3))'
      }
    );

    return () => tl.kill();
  }, []);

  return (
    <div className="container mx-auto p-6" ref={sectionRef}>
      {/* Simple Links 01 - Always Visible */}
      <div ref={linksRef} className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 text-center rounded-lg shadow-md mb-8 p-6">
        <h1 className="text-4xl font-bold mb-4">We'd love to hear from you</h1>
        <p className="text-lg mb-6">Our friendly team is always here to chat.</p>
        <div className="flex justify-around max-w-2xl mx-auto">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <span className="inline-block bg-purple-100 dark:bg-purple-900 rounded-full p-4 shadow-md">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM4 0h16v2H4V0zm0 22h16v2H4v-2zm8-10c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-2.2 0-4 1.8-4 4v2h8v-2c0-2.2-1.8-4-4-4z"/>
                </svg>
              </span>
            </div>
            <p className="font-medium mb-2">Email</p>
            <p className="text-purple-600 dark:text-purple-400">hi@untitledui.com</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <span className="inline-block bg-purple-100 dark:bg-purple-900 rounded-full p-4 shadow-md">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1.45 1 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </span>
            </div>
            <p className="font-medium mb-2">Office</p>
            <p className="text-purple-600 dark:text-purple-400">100 Smith Street<br />Collingwood VIC 3066 AU</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <span className="inline-block bg-purple-100 dark:bg-purple-900 rounded-full p-4 shadow-md">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1.45 1 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </span>
            </div>
            <p className="font-medium mb-2">Phone</p>
            <p className="text-purple-600 dark:text-purple-400">Mon-Fri from 8am to 5pm.<br />+1 (555) 000-0000</p>
          </div>
        </div>
      </div>

      {/* Form and Map */}
      <div ref={formMapRef} className="flex flex-col md:flex-row gap-6 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">We'd love to hear from you</h2>
          <form className="space-y-4">
            <input type="text" placeholder="First name" className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            <input type="text" placeholder="Last name" className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            <input type="email" placeholder="Email" className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            <input type="tel" placeholder="Phone" className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
            <textarea placeholder="Message" className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" rows="4"></textarea>
            <button type="submit" className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 shadow-md transition duration-300">Send Message</button>
          </form>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">Our Location</h2>
          <div className="relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3620.401590081113!2d67.00464987401142!3d24.850130145673422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06f2a60f3b%3A0xd6863f65ab088107!2sTechnoCom%20Developments!5e0!3m2!1sen!2s!4v1761140136766!5m2!1sen!2s"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
            ></iframe>
            <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 p-2 rounded-lg shadow-md">
              <p className="text-sm text-gray-800 dark:text-gray-200">TechnoCom Developments</p>
              <p className="text-sm text-gray-800 dark:text-gray-200">Suite #408, Uni Center I.I Chundrigar Rd, Karachi</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;