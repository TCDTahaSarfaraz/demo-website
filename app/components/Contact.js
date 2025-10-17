'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Contact = () => {
  const sectionRef = useRef(null)
  const q = gsap.utils.selector(sectionRef)
  const buttonRef = useRef(null)

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
      q('.form-field'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.2 }
    )

    const button = buttonRef.current
    const buttonTween = gsap.to(button, {
      scale: 1.05,
      backgroundColor: '#4338ca',
      duration: 0.3,
      paused: true,
      ease: 'power2.inOut',
    })

    button.addEventListener('mouseenter', () => buttonTween.play())
    button.addEventListener('mouseleave', () => buttonTween.reverse())

    return () => {
      button.removeEventListener('mouseenter', () => buttonTween.play())
      button.removeEventListener('mouseleave', () => buttonTween.reverse())
    }
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold mb-8">Contact Us</h2>
        <div className="max-w-xl mx-auto">
          <form className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            <div className="relative form-field mb-8">
              <input type="text" id="name" className="peer w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 focus:outline-none" placeholder=" " />
              <label htmlFor="name" className="absolute left-2 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-blue-500 peer-focus:text-sm">Name</label>
            </div>
            <div className="relative form-field mb-8">
              <input type="email" id="email" className="peer w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 focus:outline-none" placeholder=" " />
              <label htmlFor="email" className="absolute left-2 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-blue-500 peer-focus:text-sm">Email</label>
            </div>
            <div className="relative form-field mb-8">
              <textarea id="message" rows="4" className="peer w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 border-2 border-transparent focus:border-blue-500 focus:outline-none" placeholder=" "></textarea>
              <label htmlFor="message" className="absolute left-2 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-blue-500 peer-focus:text-sm">Message</label>
            </div>
            <button
              ref={buttonRef}
              type="submit"
              className="form-field bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact