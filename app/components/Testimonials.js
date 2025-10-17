'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Testimonials = () => {
  const sectionRef = useRef(null)
  const q = gsap.utils.selector(sectionRef)

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top center',
      },
    })

    tl.fromTo(
      q('h2'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    ).fromTo(
      q('.testimonial-card'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.2 }
    )
  }, [])

  return (
    <section id="testimonials" ref={sectionRef} className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-8">Testimonials</h2>
        <div className="max-w-2xl mx-auto">
          <div className="testimonial-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <p className="text-lg mb-4">"This is a fantastic website. I am very happy with the result."</p>
            <p className="font-bold">- Client 1</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials