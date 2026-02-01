import { useState, useEffect, lazy, Suspense } from 'react'

import './Footer.css'

const RightPanelContent = lazy(() => import('./RightPanelContent'));

function Footer() {
    const [leftWidth, setLeftWidth] = useState(() => window.innerWidth < 1200 ? 95 : 30)
    const [isDragging, setIsDragging] = useState(false)
    const [hasInteracted, setHasInteracted] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
    const [isSmall, setIsSmall] = useState(window.innerWidth < 1200)
    const [introVisible, setIntroVisible] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768)
            setIsSmall(window.innerWidth < 1200)
        }
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    // (NO LOGIC CHANGES BELOW)

    return (
        <div className="app-container">
            <div className={`left-panel ${introVisible ? 'force-hover' : ''}`} style={{ width: `${leftWidth}%` }}>
                

                <div className="overlay-buttons-wrapper force-visible">

                    {/* GitHub */}
                    <a
                        href="https://github.com/pratikrhalnor"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="overlay-button"
                    >
                        Github
                    </a>

                    {/* LinkedIn */}
                    <a
                        href="https://www.linkedin.com/in/pratikhalnor"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="overlay-button"
                    >
                        Linkedin
                    </a>

                    {/* Resume */}
                    <a
                        href="/PRATIK_HALNOR.pdf"
                        download="PRATIK_HALNOR.pdf"
                        className="overlay-button"
                    >
                        Resume
                    </a>
                </div>
            </div>

            <div className="right-panel">
                <Suspense fallback={<div>Loading...</div>}>
                    <RightPanelContent />
                </Suspense>
            </div>
        </div>
    )
}

export default Footer
