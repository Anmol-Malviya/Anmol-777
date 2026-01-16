'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ArrowDown, Sparkles, Code, Rocket, Briefcase, Globe, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { siteConfig } from '@/data/portfolio';

const floatingElements = [
    { icon: Code, delay: 0, x: '10%', y: '15%', size: 'text-blue-400' },
    { icon: Rocket, delay: 0.5, x: '85%', y: '20%', size: 'text-purple-400' },
    { icon: Sparkles, delay: 1, x: '5%', y: '65%', size: 'text-teal-400' },
    { icon: Code, delay: 1.5, x: '90%', y: '75%', size: 'text-pink-400' },
];

// Typewriter Component
function TypewriterText({ text }: { text: string }) {
    const [displayText, setDisplayText] = React.useState('');
    const [currentIndex, setCurrentIndex] = React.useState(0);

    React.useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, 100); // Adjust speed here (lower = faster)

            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text]);

    return (
        <span className="relative inline-flex">
            {displayText}
            <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block w-0.5 h-[1em] bg-primary ml-1 -mb-1"
                style={{ display: currentIndex >= text.length ? 'none' : 'inline-block' }}
            />
        </span>
    );
}

export function HeroSection() {
    const containerRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const { scrollY } = useScroll();

    // Parallax transforms
    const y1 = useTransform(scrollY, [0, 500], [0, -50]);
    const y2 = useTransform(scrollY, [0, 500], [0, 100]);
    const y3 = useTransform(scrollY, [0, 500], [0, -150]);
    const rotate = useTransform(scrollY, [0, 500], [0, 15]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (titleRef.current) {
                const chars = titleRef.current.querySelectorAll('.char');
                gsap.fromTo(chars,
                    { y: 80, opacity: 0, rotationX: -60 },
                    {
                        y: 0,
                        opacity: 1,
                        rotationX: 0,
                        stagger: 0.04,
                        duration: 1.2,
                        ease: 'expo.out',
                        delay: 0.4
                    }
                );
            }
        }, containerRef);

        return () => ctx.revert();
    }, []);

    const handleNavClick = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const splitText = (text: string) => {
        return text.split('').map((char, index) => (
            <span
                key={index}
                className="char inline-block"
                style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
            >
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    };

    return (
        <section
            ref={containerRef}
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
        >
            {/* Ultra High-End Background Layering */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-background" />
                <div
                    className="absolute inset-0 opacity-[0.15]"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, oklch(0.7 0.25 265) 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Layered Mesh Gradients */}
                <motion.div
                    style={{ y: y1 }}
                    className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/20 rounded-full blur-[140px]"
                />
                <motion.div
                    style={{ y: y2 }}
                    className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-secondary/20 rounded-full blur-[140px]"
                />
                <motion.div
                    style={{ y: y3 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px]"
                />
            </div>

            {/* Background Noise for Texture */}
            <div className="noise-overlay" />

            {/* Desktop Floating Content (Hidden on Mobile) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
                {/* Experience Card */}
                <motion.div
                    style={{ y: y1, rotate }}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute top-[25%] left-[8%] p-5 rounded-2xl glass border border-primary/20 glow-primary backdrop-blur-xl z-20"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-primary/10">
                            <Briefcase className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Experience</p>
                            <p className="text-xl font-bold text-foreground">3+ Years</p>
                        </div>
                    </div>
                </motion.div>

                {/* Project Badge */}
                <motion.div
                    style={{ y: y3 }}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="absolute bottom-[20%] right-[10%] p-5 rounded-2xl glass border border-secondary/20 glow-secondary backdrop-blur-xl z-20"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-secondary/10">
                            <Star className="w-6 h-6 text-secondary" />
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Active Project</p>
                            <p className="text-lg font-bold text-foreground">AI Interviewer</p>
                        </div>
                    </div>
                </motion.div>

                {/* Location Badge */}
                <motion.div
                    style={{ y: y2 }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                    className="absolute top-[20%] right-[15%] flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10"
                >
                    <Globe className="w-4 h-4 text-accent" />
                    <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Based in India</span>
                </motion.div>
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <div className="max-w-5xl w-full grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">

                    {/* Left: Text Content */}
                    <div className="text-center lg:text-left order-2 lg:order-1">
                        {/* Modern Status Badge */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass border border-primary/20 mb-8 mx-auto lg:mx-0 group cursor-default"
                        >
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 shadow-[0_0_8px_oklch(0.7_0.25_265)]"></span>
                            </span>
                            <span className="text-sm font-medium text-primary uppercase tracking-[0.2em]">Available for projects</span>
                        </motion.div>

                        <h1
                            ref={titleRef}
                            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-8"
                        >
                            <span className="block text-[0.4em] font-medium text-muted-foreground tracking-[0.3em] uppercase mb-4">
                                Hello, I&apos;m
                            </span>
                            <span className="gradient-text drop-shadow-2xl">
                                {splitText("Anmol Malviya")}
                            </span>
                        </h1>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground/90 mb-6 flex items-center justify-center lg:justify-start gap-4"
                        >
                            <TypewriterText text="Full-Stack Web Developer" />
                            <span className="hidden md:inline h-px w-12 bg-primary/50"></span>
                        </motion.div>

                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="text-lg sm:text-xl text-muted-foreground max-w-xl mb-10 leading-relaxed"
                        >
                            I build exceptional digital experiences with
                            <span className="text-foreground"> React, Node.js, and MongoDB. </span>
                            Merging technical precision with creative vision.
                        </motion.p>

                        {/* High-End CTA Design */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6"
                        >
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Button
                                    size="lg"
                                    onClick={() => handleNavClick('#projects')}
                                    className="relative h-14 px-10 text-lg font-bold rounded-2xl bg-primary text-primary-foreground group overflow-hidden glow-primary shadow-2xl"
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Launch Projects
                                        <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_100%] animate-[gradientShift_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Button>
                            </motion.div>

                            <motion.button
                                whileHover={{ scale: 1.05, x: 5 }}
                                onClick={() => handleNavClick('#contact')}
                                className="flex items-center gap-3 text-lg font-bold group"
                            >
                                <span className="border-b-2 border-primary/30 group-hover:border-primary transition-colors py-1">
                                    Contact Me
                                </span>
                                <div className="p-2 rounded-full bg-white/5 group-hover:bg-primary/10 transition-colors">
                                    <ArrowDown className="w-5 h-5 -rotate-45" />
                                </div>
                            </motion.button>
                        </motion.div>
                    </div>

                    {/* Right: Premium Profile Centerpiece */}
                    <div className="order-1 lg:order-2 flex justify-center relative">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, ease: 'circOut' }}
                            className="relative"
                        >
                            {/* Orbital Rings */}
                            <div className="absolute inset-[-40px] border border-primary/20 rounded-full animate-[spin_10s_linear_infinite]" />
                            <div className="absolute inset-[-60px] border border-secondary/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />

                            {/* Profile Image Wrap */}
                            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-[3rem] overflow-hidden group shadow-2xl bg-white/5 border border-white/10">
                                {/* Holographic Overlay */}
                                <div className="absolute inset-0 z-10 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <Image
                                    src={siteConfig.avatarUrl}
                                    alt={siteConfig.name}
                                    fill
                                    className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 400px"
                                />

                                {/* Floating Tech Icons around Image */}
                                <div className="absolute bottom-6 left-6 z-20 flex gap-2">
                                    <div className="p-2.5 rounded-xl glass backdrop-blur-md border border-white/20 shadow-lg">
                                        <Code className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="p-2.5 rounded-xl glass backdrop-blur-md border border-white/20 shadow-lg">
                                        <Globe className="w-5 h-5 text-accent" />
                                    </div>
                                </div>
                            </div>


                            {/* Centerpiece Glow */}
                            <div className="absolute inset-0 bg-primary/20 blur-[80px] -z-10 rounded-full scale-125" />
                        </motion.div>
                    </div>
                </div>

                {/* Tech Stack Horizontal Scroll (Infinite) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="mt-24 w-full max-w-4xl"
                >
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        {['REACT', 'NEXT.JS', 'NODE.JS', 'MONGODB', 'TYPESCRIPT', 'GSAP'].map((text) => (
                            <span key={text} className="text-sm font-black tracking-[0.3em]">{text}</span>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block"
            >
                <div className="flex flex-col items-center gap-3">
                    <div className="w-px h-16 bg-gradient-to-b from-primary/50 to-transparent" />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted-foreground vertical-text">Scroll</span>
                </div>
            </motion.div>
        </section>
    );
}
