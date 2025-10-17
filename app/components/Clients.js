'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Clients = () => {
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
      q('.client'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.2 }
    )
  }, [])

  return (
    <section id="clients" ref={sectionRef} className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-8">Our Clients</h2>
        <div className="flex justify-center space-x-8">
          <div className="client text-2xl font-bold">Client 1</div>
          <div className="client text-2xl font-bold">Client 2</div>
          <div className="client text-2xl font-bold">Client 3</div>
          <div className="client text-2xl font-bold">Client 4</div>
        </div>
      </div>
    </section>
  )
}

export default Clients