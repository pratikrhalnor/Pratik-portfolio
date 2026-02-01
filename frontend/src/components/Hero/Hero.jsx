import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import NeuralNetwork from './NeuralNetwork';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const containerRef = useRef(null);
    const imageRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Text animation
            gsap.from('.letter', {
                y: 5,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                stagger: 0.15,
                delay: 0.5
            });

            // Image blur on scroll
            gsap.to(imageRef.current, {
                filter: 'blur(10px)',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 1
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} className="hero-wrapper">
            {/* Neural network background */}
            <NeuralNetwork />

            {/* Hero content */}
            <div
                className="section h-screen flex items-center justify-center text-white text-[24vw] font-bold font-[Teko] tracking-widest overflow-hidden relative z-10"
                data-color="#000000"
            >
                <span className="letter">P</span>
                <span className="letter">R</span>
                <span className="letter">A</span>
                <span className="letter">T</span>
                <span className="letter">I</span>
                <span className="letter">K</span>

                
            </div>
        </div>
    );
};

export default Hero;
