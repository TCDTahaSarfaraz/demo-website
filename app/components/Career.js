'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Career = () => {
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
      q('.career-card'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.2 }
    )
  }, [])

  return (
    <section id="career" ref={sectionRef} className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-8">Career</h2>
        <div className="max-w-2xl mx-auto">
          <div className="career-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-4">
            <h3 className="text-2xl font-bold mb-2">Frontend Developer</h3>
            <p>We are looking for a skilled frontend developer to join our team.</p>
          </div>
          <div className="career-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-2">Backend Developer</h3>
            <p>We are looking for a skilled backend developer to join our team.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Career