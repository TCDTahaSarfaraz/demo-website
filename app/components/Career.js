'use client'

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Star = ({ style }) => <div className="absolute bg-gray-700 dark:bg-gray-300 rounded-full animate-glow" style={style}></div>;

const Career = () => {
    const sectionRef = useRef(null);
    const isAnimated = useRef(false);

    const jobOpenings = [
        { title: 'Senior Frontend Engineer', department: 'Engineering', location: 'Remote' },
        { title: 'Product Designer', department: 'Design', location: 'New York, NY' },
        { title: 'Lead Backend Developer', department: 'Engineering', location: 'Remote' },
        { title: 'Marketing Strategist', department: 'Marketing', location: 'London, UK' },
    ];

    useEffect(() => {
        if (isAnimated.current) return;
        isAnimated.current = true;

        const q = gsap.utils.selector(sectionRef);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 60%',
            },
            defaults: { ease: 'power3.out' }
        });

        tl.from(q('h2'), { opacity: 0, y: 50, duration: 1 })
          .from(q('.section-subtitle'), { opacity: 0, y: 30, duration: 0.8 }, "-=0.8");

        gsap.from(q('.career-card'), {
            scrollTrigger: {
                trigger: q('.career-grid')[0],
                start: 'top 80%',
            },
            opacity: 0,
            y: 50,
            stagger: 0.2,
            duration: 0.8
        });

    }, []);

    return (
        <section id="career" ref={sectionRef} className="relative min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 py-24 overflow-hidden">
            {/* Subtle glowing star background */}
            <div className="absolute inset-0 z-0">
                <Star style={{ top: '15%', left: '10%', width: '3px', height: '3px', animationDelay: '0s' }} />
                <Star style={{ top: '30%', right: '15%', width: '2px', height: '2px', animationDelay: '1.2s' }} />
                <Star style={{ bottom: '20%', left: '20%', width: '3px', height: '3px', animationDelay: '2.5s' }} />
                <Star style={{ bottom: '40%', right: '25%', width: '2px', height: '2px', animationDelay: '3.1s' }} />
            </div>

            <div className="relative z-10 text-center container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-stripe-dark dark:text-white">Build the future with us</h2>
                <p className="section-subtitle text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-16">
                    We’re looking for passionate people to join our mission. Explore our open roles and discover a career that makes an impact.
                </p>

                <div className="career-grid grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {jobOpenings.map((job) => (
                        <div key={job.title} className="career-card text-left p-6 bg-gray-50/50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 rounded-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-stripe-dark dark:text-white">{job.title}</h3>
                                    <p className="text-gray-500 dark:text-gray-400 mt-1">{job.department} &middot; {job.location}</p>
                                </div>
                                <button className="text-stripe-purple font-semibold text-2xl hover:scale-110 transition-transform">&rarr;</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Career;