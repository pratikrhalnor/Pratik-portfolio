import imgReact from '../../assets/react.svg'
import imgNode from '../../assets/Node.png'
import imgMongo from '../../assets/Mongo.png'
import imgPython from '../../assets/python.png'

const Projects = () => {
  return (
    <>
      <section className='panel h-screen w-screen flex-shrink-0 flex flex-col justify-center items-center font-[Teko] text-white font-bold relative' data-color="#1E1E2E">
        <h1 className='text-[24vw] leading-none'>Projects</h1>

        {/* Floating Tech Stack - Scattered Randomly */}
        <img src={imgReact} alt="React" className='project-icon-react absolute w-20 h-20 top-[10%] left-[5%] md:w-40 md:h-40 object-contain' />
        <img src={imgNode} alt="Node" className='project-icon-node absolute w-20 h-20 top-[30%] right-[20%] md:w-40 md:h-40 object-contain' />
        <img src={imgMongo} alt="MongoDB" className='project-icon-mongo absolute w-20 h-20 bottom-[15%] left-[30%] md:w-40 md:h-40 object-contain' />
        <img src={imgPython} alt="Python" className='project-icon-python absolute w-20 h-20 bottom-[35%] right-[5%] md:w-40 md:h-40 object-contain' />

      </section>
    </>
  )
}

Projects.displayName = 'Projects'

export default Projects