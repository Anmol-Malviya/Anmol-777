'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
    const [mounted, setMounted] = useState(false);
    const [isPointer, setIsPointer] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 350 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Check if device supports hover (not mobile)
        const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
        const updateMobile = () => setIsMobile(!mediaQuery.matches);

        updateMobile();
        mediaQuery.addEventListener('change', updateMobile);

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseEnter = () => setIsHidden(false);
        const handleMouseLeave = () => setIsHidden(true);

        // Optimized hover detection using event delegation
        const checkHoverable = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target) return;

            // Check if element or its parents are interactive
            const isInteractive =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') !== null ||
                target.closest('button') !== null ||
                target.closest('[role="button"]') !== null ||
                target.classList.contains('cursor-pointer') ||
                window.getComputedStyle(target).cursor === 'pointer';

            setIsPointer(isInteractive);
        };

        window.addEventListener('mousemove', moveCursor);
        // Use mouseover for detection instead of running logic on every pixel move
        window.addEventListener('mouseover', checkHoverable);

        document.body.addEventListener('mouseenter', handleMouseEnter);
        document.body.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            mediaQuery.removeEventListener('change', updateMobile);
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', checkHoverable);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [cursorX, cursorY]);

    if (!mounted || isMobile) return null;

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 w-3 h-3 rounded-full bg-primary pointer-events-none z-[9999] mix-blend-difference"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: isHidden ? 0 : 1,
                }}
            />

            {/* Cursor ring */}
            <motion.div
                className="fixed top-0 left-0 rounded-full border border-primary/50 pointer-events-none z-[9998]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: isHidden ? 0 : 0.5,
                }}
                animate={{
                    width: isPointer ? 48 : 32,
                    height: isPointer ? 48 : 32,
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 400 }}
            />
        </>
    );
}
