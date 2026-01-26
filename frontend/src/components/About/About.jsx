import React, { forwardRef } from 'react'
import img from '../../assets/ai_wire.png'
import img2 from '../../assets/FullStack.png'

const About = () => {
  return (
    <>
      <section className='panel h-screen w-screen flex-shrink-0 flex justify-center items-center font-[Teko] text-white text-[24vw] font-bold' data-color="#030303ff">
        ABOUT ?
      </section>

      <section className='panel h-screen w-screen flex-shrink-0 flex justify-center items-center text-white px-6 md:px-16 ' data-color="#9E3838">

        <div className='flex flex-col lg:flex-row justify-center items-center w-full max-w-7xl mx-auto gap-8 md:gap-16'>

          <div className='w-full md:w-[48vw] flex flex-col gap-4 items-center lg:items-start text-center lg:text-left'>
            <h1 className='font-bold text-3xl md:text-4xl mb-2 '>Learning Building Improving.</h1>
            <p className='text-sm md:text-lg leading-relaxed text-gray-200'>Engineer focused on delivering production-ready web applications and intelligent systems.</p>
            <p className='text-sm md:text-lg leading-relaxed text-gray-200'>Specialize in full-stack development (MERN) and I’m expanding into applied AI/ML to build more capable products. </p>
            <p className='text-sm md:text-lg leading-relaxed text-gray-200'>I grow by shipping real projects, measuring impact, and iterating</p>
            <p className='text-sm md:text-lg leading-relaxed text-gray-200'>Currently Working in Bosch India as a Full Stack Dev</p>
          </div>

          <div className='w-full md:w-[35vw] flex flex-row justify-center gap-4 md:gap-6'>
            <div className="about-img-ai-wrapper">
              <img
                src={img}
                alt="AI Structure"
                className='w-auto object-cover rounded-xl transform hover:scale-105 transition-transform duration-500 rotate-180 '
              />
            </div>
            <div className="about-img-fs-wrapper">
              <img
                src={img2}
                alt="Tech Stack"
                className='w-auto object-cover rounded-xl transform hover:scale-105 transition-transform duration-500 '
              />
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

About.displayName = 'About'

export default About