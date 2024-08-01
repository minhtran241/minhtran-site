'use client';
import FontAwesomeIcon from '@/common/elements/FontAwesomeIcon';
import { useWindowSize } from '@uidotdev/usehooks';
import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
    // Reference to the cursor element
    const cursorRef = useRef(null);
    // State to track cursor position
    const [position, setPosition] = useState({ x: 0, y: 0 });
    // State to track click event
    const [clicked, setClicked] = useState(false);

    const { width } = useWindowSize();
    const isMobile = width < 480;

    useEffect(() => {
        // Event listener for mouse movement
        const handleMouseMove = (e) => {
            setPosition({
                x: e.clientX,
                y: e.clientY,
            });
        };
        // Event listener for mouse click
        const handleMouseDown = () => {
            setClicked(true);
            // Reset click state after 800 milliseconds
            setTimeout(() => {
                setClicked(false);
            }, 800);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        // Cleanup event listeners on component unmount
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
        };
    }, []); // useEffect runs only once on mount

    return isMobile ? (
        <></>
    ) : (
        <>
            <div
                style={{ top: position.y, left: position.x }}
                ref={cursorRef}
                className={`fixed pointer-events-none -translate-x-1/2 -translate-y-1/2 fa-lg z-[99999] transition-transform duration-200 ease-in-out transform 
				${clicked ? 'scale-150' : ''}`}
            >
                <FontAwesomeIcon icon="fa-duotone fa-solid fa-arrow-pointer" />
            </div>
        </>
    );
};

export default CustomCursor;
