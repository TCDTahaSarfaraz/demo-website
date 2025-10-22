'use client';
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { color: "indigo", name: "@john", quote: "Outstanding results and exceptional service - @john", pos: [8, 19, 33], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John" },
  { color: "orange", name: "@sarah", quote: "Efficient, professional, and dedicated - @sarah", pos: [15, 45, 28], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
  { color: "green", name: "@rayana", quote: "Consistently outstanding service!! - @rayana", pos: [12, 78, 25], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rayana" },
  { color: "rose", name: "@emily", quote: "Exceeds expectations every time - @emily", pos: [42, 18, 26], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily" },
  { color: "purple", name: "@priya", quote: "Sleek designs, exceptional service - @priya", pos: [48, 50, 29], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya" },
  { color: "gray", name: "@harsh", quote: '"Exceptional designs, unmatched quality." - @harsh', pos: [45, 82, 28], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Harsh" },
  { color: "pink", name: "@olivia", quote: "Consistently delivers excellence! - @olivia", pos: [75, 18, 30], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia" },
  { color: "sky", name: "@jane", quote: "Designs that speak volumes - @jane", pos: [78, 65, 28], avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane" },
];

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);
    listener();
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, [query]);
  return matches;
};

const TestimonialCard = ({ quote, name, avatar, color }) => {
  const colorVariants = {
    indigo: { card: 'bg-indigo-50', text: 'text-indigo-900', avatar: 'bg-indigo-100' },
    orange: { card: 'bg-orange-50', text: 'text-orange-900', avatar: 'bg-orange-100' },
    green:  { card: 'bg-green-50', text: 'text-green-900', avatar: 'bg-green-100' },
    rose:   { card: 'bg-rose-50', text: 'text-rose-900', avatar: 'bg-rose-100' },
    purple: { card: 'bg-purple-50', text: 'text-purple-900', avatar: 'bg-purple-100' },
    gray:   { card: 'bg-gray-100', text: 'text-gray-800', avatar: 'bg-gray-200' },
    pink:   { card: 'bg-pink-50', text: 'text-pink-900', avatar: 'bg-pink-100' },
    sky:    { card: 'bg-sky-50', text: 'text-sky-900', avatar: 'bg-sky-100' },
  };

  const classes = colorVariants[color] || colorVariants.gray;

  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl shadow-sm transition-transform duration-300 hover:-translate-y-1 ${classes.card}`}>
      <div className={`w-12 h-12 rounded-lg p-1 flex-shrink-0 ${classes.avatar}`}>
        <img src={avatar} alt={name} className="w-full h-full object-cover rounded-md" />
      </div>
      <p className={`text-sm font-medium leading-relaxed ${classes.text}`}>{quote}</p>
    </div>
  );
};

const Testimonials = () => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    if (!isDesktop || !containerRef.current) {
      gsap.set(".testimonial-card-wrapper", { clearProps: "all" });
      return;
    }

    const cards = gsap.utils.toArray(".testimonial-card-wrapper");
    
    const ctx = gsap.context(() => {
      gsap.set(cards, {
        position: 'absolute', xPercent: -50, yPercent: -50,
        top: "50%", left: "50%",
        scale: 0.5, opacity: 0,
      });

      gsap.to(cards, {
        scale: 1, opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        stagger: { amount: 1, from: "random" },
        top: (i) => `${testimonials[i].pos[0]}%`,
        left: (i) => `${testimonials[i].pos[1]}%`,
        width: (i) => `${testimonials[i].pos[2]}%`,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom bottom",
          toggleActions: "play none none reverse",
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section id="testimonials" className="relative w-full bg-white py-20 md:py-28 overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 md:mb-20">
          <div className="text-center md:text-left">
            <p className="text-sm font-semibold text-gray-500 tracking-wider">12K + HAPPY CLIENTS</p>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-gray-900">Client Experiences</h2>
          </div>
          <a href="#" className="self-center md:self-auto mt-6 md:mt-0 flex items-center gap-2 font-semibold text-gray-600 hover:text-indigo-600 transition-colors">
            Read All Reviews →
          </a>
        </div>
        
        <div className="flex justify-center">
          <div ref={containerRef} className={isDesktop ? 'relative w-full max-w-6xl h-[600px] lg:h-[700px]' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl'}>
            {testimonials.map((testimonial, i) => (
              <div key={i} className={isDesktop ? 'testimonial-card-wrapper' : ''}>
                <TestimonialCard {...testimonial} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;