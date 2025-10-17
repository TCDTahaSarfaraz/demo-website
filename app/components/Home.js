'use client';
import { useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

const Home = () => {
  useEffect(() => {
    gsap.to('.globe', { rotation: 360, duration: 20, repeat: -1, ease: 'none' });
  }, []);

  return (
    <section id="home" className="relative flex flex-col items-center justify-center min-h-screen text-center bg-background text-foreground overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/globe.svg"
          alt="Globe"
          layout="fill"
          objectFit="cover"
          className="globe"
        />
      </div>
      <div className="relative z-10 p-8">
        <h1 className="text-6xl font-bold mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
            Build for growth
          </span>
        </h1>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          The world’s most successful platforms and products are built on Stripe. We’ve created a fully integrated suite of payments products and powerful developer tools to help you grow your business.
        </p>
        <button className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary-dark transition-colors">
          Start now
        </button>
      </div>
    </section>
  );
};

export default Home;