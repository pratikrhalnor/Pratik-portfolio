import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
    const dotRef = useRef(null);
    const ringRef = useRef(null);

    useEffect(() => {
        // Optimization: Do not initialize on mobile/touch devices
        if (window.matchMedia("(pointer: coarse)").matches) return;

        // Initial setup to center elements
        gsap.set([dotRef.current, ringRef.current], { xPercent: -50, yPercent: -50 });

        let isHovering = false;

        const onMouseMove = (e) => {
            // Dot follows immediately
            gsap.to(dotRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0,
                overwrite: true
            });

            // Ring follows with slight delay
            gsap.to(ringRef.current, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.15,
                overwrite: true
            });
        };

        const onMouseDown = () => {
            ringRef.current.classList.add('cursor-click');
        };

        const onMouseUp = () => {
            ringRef.current.classList.remove('cursor-click');
        };

        // Use event delegation for hover detection
        const onMouseOver = (e) => {
            // Check if target or any parent is clickable
            const target = e.target;
            const isClickable = target.closest('a, button, input, textarea, select, [role="button"], .clickable, .project-card, .menu-item'); // Added extra common selectors

            if (isClickable && !isHovering) {
                isHovering = true;
                dotRef.current.classList.add('cursor-hover');
                ringRef.current.classList.add('cursor-hover');
            } else if (!isClickable && isHovering) {
                isHovering = false;
                dotRef.current.classList.remove('cursor-hover');
                ringRef.current.classList.remove('cursor-hover');
            }
        };

        // Fallback for mouseout (e.g. leaving window)
        const onMouseOut = (e) => {
            if (!e.relatedTarget) {
                // Left the window or similar
                // Optional: hide cursor or reset state using opacity
                // For now, we stick to CSS visibility rules
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mouseover', onMouseOver);
        window.addEventListener('mouseout', onMouseOut);

        document.body.classList.add('custom-cursor-enabled');

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mouseover', onMouseOver);
            window.removeEventListener('mouseout', onMouseOut);
            document.body.classList.remove('custom-cursor-enabled');
        };
    }, []);

    return (
        <>
            <div ref={dotRef} className="cursor-dot"></div>
            <div ref={ringRef} className="cursor-ring"></div>
        </>
    );
};

export default CustomCursor;
