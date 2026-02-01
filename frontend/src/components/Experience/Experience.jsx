import React, { useEffect, useState, useMemo, memo, useCallback } from 'react'
import '../../App.css'
import './Experience.css'

import ltLogo from '../../assets/Experience logo/l&t logo1.jpeg'
import techLogo from '../../assets/Experience logo/techligence.png'


/* --- CONSTANTS & CONFIGURATION --- */
const EXPERIENCE_DATA = [
    {
        id: "1",
        year: "2023",
        date: "Jun 2023 – Jun 2024",
        image: ltLogo,
        role: "Diploma Engineer Apprentice",
        desc: "Completed a one-year apprenticeship at L&T Precision Engineering Systems in the defence sector. Assisted in the integration, assembly, testing, and validation of mission-critical electronic systems. Contributed to assembling and testing over 12 ASW launcher systems, ensuring full operational readiness and compliance with strict naval defence standards.",
        emergeDir: "top",
        position: "md:bottom-16 md:left-12",
        origin: "origin-bottom-left",
        activeOnYear: "2023"
    },
    {
        id: "2",
        year: "2025",
        date: "Jun 2025 – Jul 2025",
        image: techLogo,
        role: "AI & Mechatronics Intern",
        desc: "Developed a remotely operated 4WD robotic chassis using Arduino, ESP32, and Raspberry Pi. Configured Raspberry Pi with Ubuntu and SSH for long-distance remote control, reducing testing time by 60%. Programmed microcontroller firmware in C/C++ and implemented wireless command protocols for real-time motor control and sensor integration.",
        emergeDir: "bottom",
        position: "md:top-8 md:left-1/2 md:-translate-x-1/2",
        origin: "origin-top",
        activeOnYear: "2024"
    }
];


/* --- PURE UI COMPONENTS --- */

const BackgroundAmbience = memo(() => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-overlay" aria-hidden="true">
        <div className="absolute top-[10%] left-[10%] w-32 h-32 opacity-[0.08] blur-[1px] rotate-[-15deg] mix-blend-difference">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c2/GitHub_Invertocat_Logo.svg" alt="" loading="lazy" className="w-full h-full object-contain invert" />
        </div>
        <div className="absolute top-[20%] right-[15%] w-40 h-40 opacity-[0.08] blur-[1px] rotate-[10deg] mix-blend-difference">
            <img src="https://huggingface.co/front/assets/huggingface_logo-noborder.svg" alt="" loading="lazy" className="w-full h-full object-contain grayscale invert" />
        </div>
        <div className="absolute bottom-[10%] left-[20%] w-48 h-48 opacity-[0.07] blur-[1px] rotate-[-5deg] mix-blend-difference">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" alt="" loading="lazy" className="w-full h-full object-contain invert" />
        </div>
        <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-white/[0.04] blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-soft-light" />
    </div>
));

const ConnectingLines = memo(({ activeYear }) => {
    const line1Filled = activeYear === '2024' || activeYear === '2025';
    const line2Filled = activeYear === '2025';

    return (
        <svg className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-[5]" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <g>
                <path d="M 23 68 Q 28 52, 35 50 Q 42 48, 48 32" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.2" strokeLinecap="round" />
                <path
                    d="M 23 68 Q 28 52, 35 50 Q 42 48, 48 32" fill="none" stroke="#ffffff" strokeWidth="0.3" strokeLinecap="round"
                    strokeDasharray="100"
                    strokeDashoffset={line1Filled ? '0' : '100'}
                    className="transition-all duration-[1000ms] ease-out shadow-glow"
                />
            </g>
            <g>
                <path d="M 52 32 Q 58 48, 65 50 Q 72 52, 77 68" fill="none" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.2" strokeLinecap="round" />
                <path
                    d="M 52 32 Q 58 48, 65 50 Q 72 52, 77 68" fill="none" stroke="#ffffff" strokeWidth="0.3" strokeLinecap="round"
                    strokeDasharray="100"
                    strokeDashoffset={line2Filled ? '0' : '100'}
                    className="transition-all duration-[1000ms] ease-out delay-200 shadow-glow"
                />
            </g>
        </svg>
    );
});

const ArchitectCard = memo(({ data, className, onHover, onLeave }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const { id, image, role, desc, date, emergeDir, activeOnYear } = data;

    const handleMouseEnter = useCallback(() => onHover(activeOnYear), [onHover, activeOnYear]);
    const handleMouseLeave = useCallback(() => onLeave(), [onLeave]);

    return (
        <div
            className={`relative group perspective-1000 cursor-pointer md:cursor-default w-[22rem] md:w-[24rem] h-[11rem] md:h-[12rem] ${className}`}
            onClick={() => setIsFlipped(!isFlipped)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="button"
            tabIndex={0}
            aria-label={`View experience details for ${role}`}
        >

            <div
                className="relative w-full h-full transition-transform duration-700 transform-style-3d md:transform-none"
                style={{ transform: isFlipped && typeof window !== 'undefined' && window.innerWidth < 768 ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
                {/* Front Face */}
                <div className={`
          absolute inset-0 backface-hidden z-20
          bg-[#1e1e24]/80 backdrop-blur-xl border border-white/15
          flex flex-col overflow-hidden rounded-lg
          md:group-hover:border-white/40 md:group-hover:bg-[#25252b]
          md:group-hover:shadow-[0_0_30px_-10px_rgba(255,255,255,0.15)]
          transition-all duration-700
          ${isFlipped ? 'pointer-events-none' : ''}
        `}>
                    <div className="flex justify-end items-center p-3 border-b border-white/10 bg-white/5">
                        <div className="flex gap-2">
                            <div className="w-1 h-1 bg-white/60 rounded-full md:group-hover:bg-emerald-400/90 transition-colors duration-500"></div>
                            <div className="w-1 h-1 bg-white/60 rounded-full md:group-hover:bg-emerald-400/90 transition-colors duration-500 delay-75"></div>
                        </div>
                    </div>
                    <div className="relative flex-1 flex items-center justify-center p-6 md:group-hover:p-7 transition-all duration-700">
                        <div className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                        <img src={image} alt="" className="relative z-10 max-w-[65%] max-h-[65%] object-contain filter grayscale invert opacity-80 md:group-hover:grayscale-0 md:group-hover:invert-0 md:group-hover:opacity-100 transition-all duration-700" />
                        <div className="md:hidden absolute bottom-3 right-0 left-0 text-center text-[9px] text-white/30 font-mono animate-pulse">
                            [ TAP_TO_DECRYPT ]
                        </div>
                    </div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-l border-t border-white/15 md:group-hover:border-white/40 transition-colors duration-500">
                        <div className="absolute bottom-1 right-1 font-mono text-[7px] text-white/50">0{id}</div>
                    </div>
                </div>

                {/* Back Face (Mobile) */}
                <div
                    className="absolute inset-0 backface-hidden bg-[#15151a] border border-white/20 p-5 flex flex-col justify-center items-start rounded-lg md:hidden z-10"
                    style={{ transform: 'rotateY(180deg)' }}
                >
                    <div className="relative flex flex-col items-start w-full h-full justify-center">
                        <span className="text-[11px] font-mono text-emerald-300 tracking-wider uppercase mb-1 block">{date}</span>
                        <h3 className="font-sans text-lg mb-2 font-bold tracking-tight text-white leading-tight">{role}</h3>
                        <p className="font-sans text-[10px] font-medium leading-relaxed text-gray-300 line-clamp-4">{desc}</p>
                    </div>
                    <div className="absolute top-2 right-2 w-2 h-2 bg-emerald-500/20 rounded-full animate-pulse"></div>
                </div>
            </div>

            {/* Hover Emerge Panel (Desktop) */}
            <div className={`
        hidden md:flex absolute left-0 right-0 z-10 h-[14rem]
        bg-[#15151a] border border-white/15 text-white
                p-5 flex-col justify-center items-center text-center
                shadow-2xl shadow-black/40 rounded-lg
                opacity-0 group-hover:opacity-100
                pointer-events-none group-hover:pointer-events-auto
                transition-all duration-700 cubic-bezier(0.19, 1, 0.22, 1)
                ${emergeDir === "top" ? 'bottom-full mb-2' : 'top-full mt-2'}
            `}>
                <div className="relative px-4">
                    <span className="text-xs font-mono text-emerald-300 tracking-wider uppercase mb-2 block">{date}</span>
                    <h3 className="font-sans text-2xl mb-3 font-bold tracking-tight text-white">{role}</h3>
                    <p className="font-sans text-sm font-medium leading-relaxed text-gray-300">{desc}</p>
                </div>
            </div>
        </div>
    );
});

// --- MAIN APPLICATION ---
const Experience = () => {
    const [activeYear, setActiveYear] = useState(null);

    // Stable handlers to prevent child re-renders
    const handleCardHover = useCallback((year) => setActiveYear(year), []);
    const handleCardLeave = useCallback(() => setActiveYear(null), []);

    return (
        <section className="panel h-screen w-screen flex-shrink-0 text-white relative overflow-hidden flex flex-col items-center justify-start md:justify-center p-6 md:p-12 selection:bg-white/30" data-color="#111115">

            <BackgroundAmbience />
            <ConnectingLines activeYear={activeYear} />

            <div className="relative w-full max-w-[90rem] h-auto md:h-[70vh] flex flex-col items-center gap-12 md:gap-0 mt-12 md:mt-24 mb-12">
                {EXPERIENCE_DATA.map((exp) => (
                    <div
                        key={exp.id}
                        className={`relative z-20 md:absolute ${exp.position}`}
                    >
                        <ArchitectCard
                            data={exp}
                            className={exp.origin}
                            onHover={handleCardHover}
                            onLeave={handleCardLeave}
                        />
                    </div>
                ))}
                {/* Mobile Connecting Spine */}
                <div className="md:hidden absolute top-0 bottom-0 left-1/2 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2 z-0"></div>
            </div>

        </section>
    )
}

export default Experience
