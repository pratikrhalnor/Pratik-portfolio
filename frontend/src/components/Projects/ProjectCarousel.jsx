import React, { useRef, useEffect, useState, useMemo } from 'react';
import gsap from 'gsap';
import { Github, ExternalLink } from 'lucide-react';
import './ProjectCarousel.css';

import gstImg from '../../assets/GSTAnomaly/gst.png'
import inventoryImg from '../../assets/SaiSundha/inventory.avif'
import dustImg from '../../assets/DustSuppresion/dust.jpg'

const ProjectCarousel = () => {
    const stackRef = useRef(null);
    const cardsRef = useRef([]);
    const containerRef = useRef(null);

    const state = useRef({
        position: 0,
        target: 0,
        velocity: 0
    });

    const [activeIndex, setActiveIndex] = useState(0);
    const activeIndexRef = useRef(0);

    const projects = useMemo(() => [
    {
        id: 1,
        title: "GST Anomaly Detection System",
        desc: "Machine learning–based system to identify fraudulent GST filings. Built an end-to-end ML pipeline and applied Random Forest to analyze key fraud indicators such as ITC mismatch rate and supplier concentration.",
        tech: ["Python", "Scikit-learn", "ML"],
        icon: <img src={gstImg} alt="GST ML Project" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />,
        color: "#e6d222ff",
        live: null,
        github: "https://github.com/pratikrhalnor"
    },
    {
        id: 2,
        title: "Inventory Portal – Sai Sundha Steel Traders",
        desc: "Web-based inventory and product catalog system for a construction materials business. Integrated an AI-powered chatbot using Chatbase to provide real-time product and pricing information to customers.",
        tech: ["HTML", "CSS", "JavaScript", "AI Chatbot"],
        icon: <img src={inventoryImg} alt="Inventory Portal" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />,
        color: "#00E5FF",
        live: null,
        github: "https://github.com/pratikrhalnor"
    },
    {
        id: 3,
        title: "Smart Dust Suppression System",
        desc: "IoT-based environmental monitoring system that activates water foggers when dust levels exceed safety limits. Used GPY210 particulate sensor with ESP32 and Blynk IoT platform for real-time monitoring and control.",
        tech: ["IoT", "ESP32", "Blynk"],
        icon: <img src={dustImg} alt="IoT Project" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />,
        color: "#c53f6cff",
        live: null,
        github: "https://github.com/pratikrhalnor"
    }
], []);




    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.fromTo('.project-card-wrapper',
                { y: 1000, opacity: 0, rotateZ: 90 },
                { y: 0, opacity: 1, rotateZ: 0, duration: 1.5, stagger: 0.1, ease: "power3.out" },
            );
        }, containerRef);

        let animationFrameId;
        let isVisible = true; // Visibility flag
        const isMobile = window.innerWidth < 768;
        const CARD_SPACING = isMobile ? 80 : 140;

        const updatePhysics = () => {
            if (!isVisible) {
                animationFrameId = requestAnimationFrame(updatePhysics);
                return;
            }

            const s = state.current;

            // Update active index based on current position
            const maxIdx = projects.length - 1;
            const newIndex = Math.min(Math.max(Math.round(s.position), 0), maxIdx);
            if (newIndex !== activeIndexRef.current) {
                activeIndexRef.current = newIndex;
                setActiveIndex(newIndex);
            }

            // Update card positions and styles
            cardsRef.current.forEach((card, i) => {
                if (!card) return;

                const dist = i - s.position;
                const abs = Math.abs(dist);

                // Optimization: Skip rendering if far off screen
                if (abs > 4) {
                    card.style.display = 'none';
                    return;
                }
                card.style.display = 'block';

                gsap.set(card, {
                    y: dist * CARD_SPACING,
                    rotateZ: dist * -10,
                    scale: 1 - Math.min(abs * 0.15, 0.5),
                    opacity: 1 - Math.min(abs * 0.3, 0.8),
                    zIndex: 100 - Math.round(abs * 10),
                    // Disable dynamic blur on mobile for performance
                    filter: isMobile ? 'none' : `blur(${Math.min(abs * 5, 20)}px)`,
                    willChange: 'transform, opacity, filter'
                });
            });

            animationFrameId = requestAnimationFrame(updatePhysics);
        };

        // Render loop management
        const observer = new IntersectionObserver(([entry]) => {
            isVisible = entry.isIntersecting;
        }, { threshold: 0.1 });

        if (containerRef.current) observer.observe(containerRef.current);

        updatePhysics();

        return () => {
            ctx.revert();
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            observer.disconnect();
        };
    }, [projects]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let isScrolling = false;
        let scrollTimeout;

        const handleWheel = (e) => {
            const container = containerRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            // Looser threshold for touchpads/smooth scroll
            const isCentered = rect.top < window.innerHeight && rect.bottom > 0;

            if (!isCentered) return;

            const s = state.current;
            const maxIdx = projects.length - 1;
            const currentIndex = Math.round(s.position);

            const isScrollingDown = e.deltaY > 0;
            const isScrollingUp = e.deltaY < 0;

            const isAtTop = currentIndex <= 0;
            const isAtBottom = currentIndex >= maxIdx;

            if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
                return;
            }

            e.preventDefault();
            e.stopPropagation();

            if (isScrolling) return;

            isScrolling = true;

            let targetIndex = currentIndex;
            if (isScrollingDown && currentIndex < maxIdx) {
                targetIndex = currentIndex + 1;
            } else if (isScrollingUp && currentIndex > 0) {
                targetIndex = currentIndex - 1;
            }

            gsap.to(state.current, {
                position: targetIndex,
                duration: 0.8,
                ease: "power3.out",
                onComplete: () => {
                    isScrolling = false;
                }
            });

            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                isScrolling = false;
            }, 500);
        };

        // Fluid Touch Logic
        let touchStartY = 0;
        let touchStartPos = 0;
        let isDragging = false;

        const SWIPE_SENSITIVITY = 120;

        const handleTouchStart = (e) => {
            const container = containerRef.current;
            if (!container) return;

            touchStartY = e.touches[0].clientY;
            touchStartPos = state.current.position;
            isDragging = true;
            gsap.killTweensOf(state.current);
        };

        const handleTouchMove = (e) => {
            if (!isDragging) return;

            const touchY = e.touches[0].clientY;
            const deltaPixel = touchStartY - touchY;

            const currentPos = state.current.position;
            const maxIdx = projects.length - 1;

            // Sensitivity threshold Check
            if (Math.abs(deltaPixel) < 10) return;

            // Check if we should allow default page scroll (at boundaries)
            if (currentPos <= 0.05 && deltaPixel < 0) return; // Top boundary
            if (currentPos >= maxIdx - 0.05 && deltaPixel > 0) return; // Bottom boundary

            if (e.cancelable) {
                e.preventDefault();
                e.stopPropagation();
            }

            let newPos = touchStartPos + (deltaPixel / SWIPE_SENSITIVITY);

            if (newPos < 0) newPos = newPos * 0.3; // Resistance at top
            if (newPos > maxIdx) newPos = maxIdx + (newPos - maxIdx) * 0.3; // Resistance at bottom

            state.current.position = newPos;
        };

        const handleTouchEnd = () => {
            if (!isDragging) return;
            isDragging = false;

            const currentPos = state.current.position;
            const maxIdx = projects.length - 1;
            let targetIndex = Math.round(currentPos);

            targetIndex = Math.max(0, Math.min(targetIndex, maxIdx));

            gsap.to(state.current, {
                position: targetIndex,
                duration: 0.6,
                ease: "back.out(0.6)"
            });
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });
        container.addEventListener('touchend', handleTouchEnd);
        container.addEventListener('touchcancel', handleTouchEnd);

        return () => {
            container.removeEventListener('wheel', handleWheel);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
            container.removeEventListener('touchcancel', handleTouchEnd);
            clearTimeout(scrollTimeout);
        };
    }, [projects]);

    const activeColor = projects[activeIndex]?.color || '#00f2ff';

    const handleCardClick = (index) => {
        state.current.target = index;
        gsap.to(state.current, {
            position: index,
            duration: 0.8,
            ease: "power3.out"
        });
    };

    return (
        <div
            ref={containerRef}
            className="universe"
            data-color={activeColor}
            style={{
                '--bg-accent': activeColor
            }}
        >
            <div className="left-sidebar">
                <div className="sidebar-content">
                    <div className="project-counter">
                        <span className="counter-current">{String(activeIndex + 1).padStart(2, '0')}</span>
                        <span className="counter-divider">/</span>
                        <span className="counter-total">{String(projects.length).padStart(2, '0')}</span>
                    </div>

                    <div className="project-info">
                        <h2 className="current-project-title">{projects[activeIndex]?.title}</h2>
                        <div className="tech-preview">
                            {projects[activeIndex]?.tech.map(t => (
                                <span key={t} className="tech-badge">{t}</span>
                            ))}
                        </div>
                    </div>

                    <div className="navigation-dots">
                        {projects.map((_, index) => (
                            <button
                                key={index}
                                className={`nav-dot ${index === activeIndex ? 'active' : ''}`}
                                onClick={() => handleCardClick(index)}
                                aria-label={`Go to project ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className="card-stack-container" ref={stackRef}>
                {projects.map((project, i) => (
                    <div
                        key={project.id}
                        className="project-card-wrapper"
                        ref={el => cardsRef.current[i] = el}
                        onClick={() => handleCardClick(i)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                handleCardClick(i);
                            }
                        }}
                    >
                        <TiltCard project={project} isActive={i === activeIndex} />
                    </div>
                ))}
            </div>

            <div className="controls-hint">
                <div className="mouse-indicator"><div className="wheel"></div></div>
            </div>
        </div>
    );
};

const TiltCard = ({ project, isActive }) => {
    const glassRef = useRef(null);

    return (
        <div className={`project-card ${isActive ? 'active' : ''}`}>
            <div
                className="card-glass"
                ref={glassRef}
                style={{
                    '--accent': project.color
                }}
            >
                <div className="card-header">
                    <div className="card-icon-box">{project.icon}</div>
                    <span className="card-id">0{project.id}</span>
                </div>

                <div className="card-body">
                    <h3>{project.title}</h3>
                    <p>{project.desc}</p>
                    <div className="tech-tags">
                        {project.tech.map(t => <span key={t}>{t}</span>)}
                    </div>
                </div>

                <div className="card-footer">
                    <button
                        className="btn-icon"
                        onClick={(e) => {
                            e.stopPropagation();
                            window.open(project.github, '_blank');
                        }}
                    >
                        <Github size={20} />
                    </button>
                    {project.live && (
                        <button
                            className="btn-primary"
                            onClick={(e) => {
                                e.stopPropagation();
                                window.open(project.live, '_blank');
                            }}
                        >
                            View Project <ExternalLink size={16} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectCarousel;
