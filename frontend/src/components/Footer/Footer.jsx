import { useState, useEffect, lazy, Suspense } from 'react' // Optimized imports
import cozyWork from '../../assets/Focused work in a cozy space.png'
import './Footer.css'

// Lazy load the component for better initial load performance
const RightPanelContent = lazy(() => import('./RightPanelContent'));

function Footer() {
    const [leftWidth, setLeftWidth] = useState(() => window.innerWidth < 1200 ? 95 : 30) // Default to 95% for tablet/mobile/small laptops
    const [isDragging, setIsDragging] = useState(false)
    const [hasInteracted, setHasInteracted] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const [isSmall, setIsSmall] = useState(window.innerWidth < 1200)
    const [introVisible, setIntroVisible] = useState(false)

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
            setIsSmall(window.innerWidth < 1200)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // Intro Animation Effect
    useEffect(() => {
        const animateDrag = () => {
            // Smooth easing function
            // eslint-disable-next-line no-unused-vars
            const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

            const isSmallNow = window.innerWidth < 1200;
            const startWidth = isSmallNow ? 95 : 30;
            const range = isSmallNow ? 2 : 5; // Smaller range if already at the edge

            let startTime = null;

            const step = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const elapsed = timestamp - startTime;

                // Normalize time to 0-1 range for the full animation sequence
                const totalDuration = 2000;
                const progress = Math.min(elapsed / totalDuration, 1);

                // Use a Sine wave for natural "swinging" motion
                const wave = Math.sin(progress * Math.PI * 2);

                // Apply easing to the drag magnitude
                const currentOffset = wave * range;

                setLeftWidth(startWidth + currentOffset);

                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    // Animation done, ensure we land exactly on startWidth
                    setLeftWidth(startWidth);

                    // Show buttons
                    setIntroVisible(true);
                    setTimeout(() => setIntroVisible(false), 2500);
                }
            };

            // Slight delay before starting - INCREASED DELAY
            setTimeout(() => requestAnimationFrame(step), 1500);
        }

        // Use IntersectionObserver to trigger animation when visible
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // Delay slightly to ensure user has settled on the section
                    setTimeout(() => {
                        animateDrag();
                    }, 500);
                    observer.disconnect(); // Run only once
                }
            },
            { threshold: 0.3 } // Trigger when 30% of the footer is visible
        );

        const footerElement = document.querySelector('.app-container');
        if (footerElement) {
            observer.observe(footerElement);
        }

        return () => observer.disconnect();
    }, []) // Run once on mount

    const handleMouseDown = (e) => {
        e.preventDefault()
        setIsDragging(true)
        setHasInteracted(true)
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return

        // Horizontal resizing for all screen sizes (Responsive)
        const newWidth = (e.clientX / window.innerWidth) * 100

        // Allow full completion (0% for form-only, 100% for image-only)
        if (newWidth >= 0 && newWidth <= 100) {
            setLeftWidth(newWidth)
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    return (
        <div className="app-container" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}
            onTouchMove={(e) => {
                if (!isDragging) return
                // Touch Logic
                const touch = e.touches[0]
                const newWidth = (touch.clientX / window.innerWidth) * 100
                if (newWidth >= 0 && newWidth <= 100) setLeftWidth(newWidth)
            }}
            onTouchEnd={handleMouseUp}
        >
            <div
                className={`left-panel ${introVisible ? 'force-hover' : ''}`}
                style={{
                    width: `${leftWidth}%`,
                    height: '100%',
                    flex: 'none'
                }}
            >
                <div className={`left-panel-overlay ${introVisible ? 'force-visible' : ''}`} style={{
                    position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1
                }}></div>

                <img src={cozyWork} alt="Focused work in a cozy space" className="sidebar-image" loading="lazy" /> {/* Added lazy loading */}

                <div className={`overlay-buttons-wrapper ${introVisible ? 'force-visible' : ''}`}>
                    <a href="https://github.com/krish070904" target="_blank" rel="noopener noreferrer" className="overlay-button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02a9.58 9.58 0 012.5-.34c.85.004 1.71.115 2.5.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85v2.74c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z" />
                        </svg>
                        Github
                    </a>
                    <a href="https://www.linkedin.com/in/krishna-wable/" target="_blank" rel="noopener noreferrer" className="overlay-button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                        Linkedin
                    </a>
                    <a href="/KRISHNA_WABLE.pdf" download="KRISHNA_WABLE.pdf" className="overlay-button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                        Resume
                    </a>
                </div>
            </div>

            <div
                className="resizer"
                onMouseDown={handleMouseDown}
                onTouchStart={handleMouseDown}
            >
                <div className="resizer-handle">
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="12" r="1"></circle><circle cx="15" cy="12" r="1"></circle>
                    </svg>
                </div>
                {!hasInteracted && (
                    <div className="resizer-guide">
                        <span>{"\u2190 Drag \u2192"}</span>
                    </div>
                )}
            </div>

            <div className="right-panel">
                <Suspense fallback={
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#888' }}>
                        Loading...
                    </div>
                }>
                    <RightPanelContent />
                </Suspense>
            </div>
        </div>
    )
}

export default Footer
