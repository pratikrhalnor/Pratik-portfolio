import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const containerRef = useRef(null)
    const imageRef = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.letter', {
                y: 5,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                stagger: 0.15,
                delay: 0.5
            })

            gsap.to(imageRef.current, {
                filter: 'blur(10px)',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1, // Reduced from 4 for better mobile performance
                }
            })

        }, containerRef)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef}>
            <div className='section h-screen flex items-center justify-center text-white text-[24vw] font-bold font-[Teko] tracking-widest overflow-hidden' data-color="#000000">
                <span className='letter'>K</span>
                <span className='letter'>R</span>
                <span className='letter'>I</span>
                <span className='letter'>S</span>
                <span className='letter'>H</span>
                <span className='letter'>N</span>
                <span className='letter'>A</span>

                <img
                    ref={imageRef}
                    className='absolute bottom-0 w-[85%] sm:w-[60%] md:w-[45%] lg:w-[35%] max-w-[500px] h-auto object-contain will-change-[filter]'
                    src="/Hero.png"
                    alt="Krishna Wable"
                    loading="eager"
                    fetchpriority="high"
                />
            </div>
        </div>
    )
}

export default Hero
