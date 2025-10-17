'use client'

import React, { useState, useEffect } from 'react'; // <-- Import useState
import { AnimatedTestimonials } from "./ui/animated-testimonials";

// --- The Hydration-Safe, Professional Star Background ---
const StarBackground = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // This `useEffect` hook ensures that Math.random() is only ever called on the client-side,
    // after the initial server render. This completely eliminates hydration errors.
    const generateStars = () => {
      const newStars = [];
      for (let i = 0; i < 50; i++) {
        newStars.push({
          key: `star-sm-${i}`,
          style: {
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: '1px',
            height: '1px',
            animation: `anim-star ${Math.random() * 50 + 50}s linear infinite`,
          },
        });
      }
      for (let i = 0; i < 20; i++) {
        newStars.push({
          key: `star-md-${i}`,
          style: {
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: '2px',
            height: '2px',
            animation: `anim-star ${Math.random() * 100 + 100}s linear infinite`,
          },
        });
      }
      setStars(newStars);
    };
    
    generateStars();
  }, []);

  return (
    <div className="absolute inset-0 z-0">
        <div className="relative h-full w-full">
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-slate-900 to-black" />
            <div className="stars">
                {stars.map(star => (
                    <div key={star.key} className="absolute bg-white rounded-full" style={star.style}></div>
                ))}
            </div>
        </div>
    </div>
  );
};


const Testimonials = () => {
    // --- The Corrected Testimonial Data ---
    // Unsplash URLs have been replaced with picsum.photos URLs, a developer-friendly service
    // that does NOT require extra configuration in next.config.js.
    const testimonialData = [
        {
          quote: "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
          name: "Sarah Chen",
          designation: "Product Manager at TechFlow",
          src: "https://picsum.photos/id/1005/300/300",
        },
        {
          quote: "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
          name: "Michael Rodriguez",
          designation: "CTO at InnovateSphere",
          src: "https://picsum.photos/id/1011/300/300",
        },
        {
          quote: "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
          name: "Emily Watson",
          designation: "Operations Director at CloudScale",
          src: "https://picsum.photos/id/1027/300/300",
        },
        {
          quote: "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
          name: "James Kim",
          designation: "Engineering Lead at DataPro",
          src: "https://picsum.photos/id/1012/300/300",
        },
        {
          quote: "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
          name: "Lisa Thompson",
          designation: "VP of Technology at FutureNet",
          src: "https://picsum.photos/id/1019/300/300",
        },
    ];
    
    return (
        <section id="testimonials" className="relative w-full bg-black py-24">
            <StarBackground />
            <div className="relative z-10 text-center container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                    Loved by teams worldwide
                </h2>
                <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-16">
                    See what the most innovative companies are saying about our platform.
                </p>
            </div>
            
            <AnimatedTestimonials testimonials={testimonialData} />
        </section>
    );
};

export default Testimonials;