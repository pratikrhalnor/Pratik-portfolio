import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import imgHead from '../../assets/head.png'
import imgExp from '../../assets/Exp.png'
import './Experience_title.css'

gsap.registerPlugin(ScrollTrigger)

const ExperienceTitle = () => {
  const containerRef = useRef(null)
  const headRef = useRef(null)
  const expRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Weird random movement for Head
      gsap.to(headRef.current, {
        x: () => Math.random() * 400 - 200,
        y: () => Math.random() * 300 - 150,
        rotation: () => Math.random() * 360,
        scale: () => 0.5 + Math.random(),
        scrollTrigger: {
          trigger: containerRef.current,
          start: "left right",
          end: "right left",
          scrub: 1.5,
          containerAnimation: document.querySelector('.section[data-color="#0c77a8ff"] .flex') // Trying to hook into parent scroll if possible, otherwise falls back
        },
        ease: "elastic.out(1, 0.3)"
      })

      // Different weird random movement for Exp
      gsap.to(expRef.current, {
        x: () => Math.random() * -400 + 200,
        y: () => Math.random() * -300 + 150,
        rotation: () => Math.random() * -360,
        filter: "hue-rotate(90deg) blur(2px)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "left 100%",
          end: "right -100%",
          scrub: 2
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section ref={containerRef} className='panel h-screen w-screen flex-shrink-0 flex flex-col justify-center items-center font-[Teko] text-white font-bold relative overflow-hidden' data-color="#4d232aff">
        <h1 className='text-[18vw] leading-none z-10 mix-blend-difference'>EXPERIENCE</h1>

        <img
          ref={headRef}
          src={imgHead}
          alt="Abstract Head"
          className="absolute w-[120px] opacity-60 pointer-events-none z-0 mix-blend-overlay"
          style={{ top: '20%', left: '20%' }}
        />

        <img
          ref={expRef}
          src={imgExp}
          alt="Abstract Exp"
          className="absolute w-[150px] opacity-50 pointer-events-none z-0 mix-blend-hard-light"
          style={{ bottom: '10%', right: '15%' }}
        />
      </section>
    </>
  )
}

ExperienceTitle.displayName = 'ExperienceTitle'

export default ExperienceTitle