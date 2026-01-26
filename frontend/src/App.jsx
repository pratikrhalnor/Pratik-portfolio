import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import Lenis from 'lenis'
import './App.css'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Projects from './components/Projects/Projects'
import Experience from './components/Experience/Experience'
import ExperienceTitle from './components/Experience/Experience_title'
import ProjectCarousel from './components/Projects/ProjectCarousel'
import Footer from './components/Footer/Footer'

import CustomCursor from './components/CustomCursor/CustomCursor'
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const horizontalRef = useRef(null)
  const experienceRef = useRef(null)
  const mainRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const sections = document.querySelectorAll('.section')

      sections.forEach((section) => {
        const color = section.getAttribute('data-color')
        if (section.classList.contains('panel')) return

        ScrollTrigger.create({
          trigger: section,
          start: "top 75%",
          end: "bottom 25%",
          onEnter: () => gsap.to(mainRef.current, { backgroundColor: color, duration: 0.35, ease: "power1.out", overwrite: 'auto' }),
          onEnterBack: () => gsap.to(mainRef.current, { backgroundColor: color, duration: 0.35, ease: "power1.out", overwrite: 'auto' }),
        })
      })

      ScrollTrigger.refresh()

      // Combine into one master horizontal section
      const horizontalSections = [horizontalRef, experienceRef]

      horizontalSections.forEach((sectionRef) => {
        if (sectionRef.current) {
          const container = sectionRef.current.querySelector('.flex')
          const panels = gsap.utils.toArray(sectionRef.current.querySelectorAll(".panel"))

          if (container && panels.length > 0) {
            const scrollTween = gsap.to(container, {
              x: () => -(container.scrollWidth - window.innerWidth),
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                pin: true,
                scrub: 1,
                end: () => "+=" + (container.scrollWidth - window.innerWidth),
                snap: {
                  snapTo: 1 / (panels.length - 1),
                  duration: { min: 0.2, max: 0.5 },
                  ease: "power2.out"
                }
              },
            })

            panels.forEach((panel) => {
              const color = panel.getAttribute('data-color')
              if (color) {
                ScrollTrigger.create({
                  trigger: panel,
                  containerAnimation: scrollTween,
                  start: "left 65%",
                  end: "right 65%",
                  onEnter: () => gsap.to(mainRef.current, { backgroundColor: color, duration: 0.35, ease: "power1.out", overwrite: 'auto' }),
                  onEnterBack: () => gsap.to(mainRef.current, { backgroundColor: color, duration: 0.35, ease: "power1.out", overwrite: 'auto' }),
                })
              }
            })

            const parallaxElements = sectionRef.current.querySelectorAll('.parallax-img')
            parallaxElements.forEach((el) => {
              const parentPanel = el.closest('.panel')
              if (parentPanel) {
                gsap.to(el, {
                  x: -600,
                  ease: "none",
                  scrollTrigger: {
                    trigger: parentPanel,
                    containerAnimation: scrollTween,
                    start: "left right",
                    end: "right left",
                    scrub: 2.5
                  }
                })
              }
            })

            // About Image Animation Logic - Updated to check inside the master section
            if (sectionRef === horizontalRef) {
              const aiWrapper = sectionRef.current.querySelector('.about-img-ai-wrapper')
              const fsWrapper = sectionRef.current.querySelector('.about-img-fs-wrapper')

              if (aiWrapper && fsWrapper) {
                const imagePanel = aiWrapper.closest('.panel')

                if (imagePanel) {
                  gsap.from(aiWrapper, {
                    y: 400,
                    opacity: 0,
                    ease: "power2.out",
                    scrollTrigger: {
                      trigger: imagePanel,
                      containerAnimation: scrollTween,
                      start: "left 30%",
                      end: "center center",
                      scrub: 1,
                    }
                  })

                  gsap.from(fsWrapper, {
                    y: -400,
                    opacity: 0,
                    ease: "power2.out",
                    scrollTrigger: {
                      trigger: imagePanel,
                      containerAnimation: scrollTween,
                      start: "left 30%",
                      end: "center center",
                      scrub: 1,
                    }
                  })
                }
              }
            }


            // Projects Icons Animation Logic
            const reactIcon = sectionRef.current.querySelector('.project-icon-react');
            const nodeIcon = sectionRef.current.querySelector('.project-icon-node');
            const mongoIcon = sectionRef.current.querySelector('.project-icon-mongo');
            const pythonIcon = sectionRef.current.querySelector('.project-icon-python');

            if (reactIcon) {
              const parentPanel = reactIcon.closest('.panel');

              // SHOCKING CHAOS ENTRANCES

              // React: VORTEX SPIN from Top-Left
              gsap.fromTo(reactIcon,
                { x: -800, y: -400, rotation: -1440, scale: 5, opacity: 0 },
                {
                  x: 0,
                  y: 0,
                  rotation: 0,
                  scale: 1,
                  opacity: 1,
                  ease: "elastic.out(1, 0.3)",
                  scrollTrigger: {
                    trigger: parentPanel,
                    containerAnimation: scrollTween,
                    start: "left 100%",
                    end: "center center",
                    scrub: 1
                  }
                }
              );

              // Node: METEOR DROP from Sky
              gsap.from(nodeIcon, {
                y: -1200,
                x: 200,
                rotation: 720,
                opacity: 0,
                ease: "bounce.out",
                scrollTrigger: {
                  trigger: parentPanel,
                  containerAnimation: scrollTween,
                  start: "left 100%",
                  end: "center center",
                  scrub: 1
                }
              });

              // Python: Smooth Spin Entry from Right
              gsap.from(pythonIcon, {
                x: 400,
                rotation: -360,
                opacity: 0,
                scale: 0.5,
                ease: "back.out(1.5)",
                scrollTrigger: {
                  trigger: parentPanel,
                  containerAnimation: scrollTween,
                  start: "left 100%",
                  end: "center center",
                  scrub: 1
                }
              });

              // Mongo: IMPLOSION POP
              gsap.from(mongoIcon, {
                scale: 0,
                rotation: 1080,
                opacity: 0,
                ease: "elastic.out(1, 0.5)",
                scrollTrigger: {
                  trigger: parentPanel,
                  containerAnimation: scrollTween,
                  start: "left 100%",
                  end: "center center",
                  scrub: 1
                }
              });
            }
          }
        }
      })

    }, mainRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: true,
      touchMultiplier: 2,
    })

    lenis.on('scroll', ScrollTrigger.update)

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div ref={mainRef} className="app-main-wrapper">
      <Hero />

      {/* Unified Horizontal Section */}
      <div ref={horizontalRef} className='section relative overflow-hidden' data-color="#000000ff">
        <div className='flex'>
          <About />
          <Projects />
        </div>
      </div>

      <div className='section' data-color="#9e3838ff">
        <ProjectCarousel />
      </div>

      {/* Experience Horizontal Section */}
      <div ref={experienceRef} className='section relative overflow-hidden' data-color="#1E1E2E">
        <div className='flex'>
          <ExperienceTitle />
          <Experience />
        </div>
      </div>

      <div className='section' data-color="#000000ff">
        <Footer />
      </div>

      <CustomCursor />
    </div >
  )
}

export default App
