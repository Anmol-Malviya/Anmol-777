'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
    Layout,
    Server,
    Wrench,
    Cpu,
} from 'lucide-react';
import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
    SiFramer,
    SiGreensock,
    SiNodedotjs,
    SiExpress,
    SiMongodb,
    SiGraphql,
    SiPostgresql,
    SiSocketdotio,
    SiGit,
    SiDocker,
    SiAmazonwebservices,
    SiVercel,
    SiFigma
} from 'react-icons/si';
import { LucideIcon } from 'lucide-react';
import { IconType } from 'react-icons';

// All skills in a flat structure for the interactive grid
const allSkills = [
    // Frontend - Mix of sizes for visual interest
    { name: 'React', level: 95, category: 'frontend', accent: 'oklch(0.7 0.25 265)', size: 'lg' as const, icon: SiReact },
    { name: 'Next.js', level: 95, category: 'frontend', accent: 'oklch(0.7 0.25 265)', size: 'lg' as const, icon: SiNextdotjs },
    { name: 'TypeScript', level: 90, category: 'frontend', accent: 'oklch(0.7 0.25 265)', size: 'md' as const, icon: SiTypescript },
    { name: 'Tailwind CSS', level: 92, category: 'frontend', accent: 'oklch(0.7 0.25 265)', size: 'md' as const, icon: SiTailwindcss },
    { name: 'Framer Motion', level: 85, category: 'frontend', accent: 'oklch(0.7 0.25 265)', size: 'sm' as const, icon: SiFramer },
    { name: 'GSAP', level: 80, category: 'frontend', accent: 'oklch(0.7 0.25 265)', size: 'sm' as const, icon: SiGreensock },

    // Backend
    { name: 'Node.js', level: 90, category: 'backend', accent: 'oklch(0.65 0.2 340)', size: 'lg' as const, icon: SiNodedotjs },
    { name: 'Express', level: 90, category: 'backend', accent: 'oklch(0.65 0.2 340)', size: 'md' as const, icon: SiExpress },
    { name: 'MongoDB', level: 88, category: 'backend', accent: 'oklch(0.65 0.2 340)', size: 'md' as const, icon: SiMongodb },
    { name: 'GraphQL', level: 85, category: 'backend', accent: 'oklch(0.65 0.2 340)', size: 'sm' as const, icon: SiGraphql },
    { name: 'PostgreSQL', level: 82, category: 'backend', accent: 'oklch(0.65 0.2 340)', size: 'sm' as const, icon: SiPostgresql },
    { name: 'Socket.io', level: 75, category: 'backend', accent: 'oklch(0.65 0.2 340)', size: 'sm' as const, icon: SiSocketdotio },

    // DevOps
    { name: 'Git', level: 95, category: 'devops', accent: 'oklch(0.55 0.3 175)', size: 'lg' as const, icon: SiGit },
    { name: 'Vercel', level: 90, category: 'devops', accent: 'oklch(0.55 0.3 175)', size: 'md' as const, icon: SiVercel },
    { name: 'Docker', level: 75, category: 'devops', accent: 'oklch(0.55 0.3 175)', size: 'sm' as const, icon: SiDocker },
    { name: 'AWS', level: 70, category: 'devops', accent: 'oklch(0.55 0.3 175)', size: 'sm' as const, icon: SiAmazonwebservices },
    { name: 'Figma', level: 85, category: 'devops', accent: 'oklch(0.55 0.3 175)', size: 'sm' as const, icon: SiFigma },
];

const categories = [
    { id: 'all', label: 'All Skills', icon: Cpu },
    { id: 'frontend', label: 'Frontend', icon: Layout },
    { id: 'backend', label: 'Backend', icon: Server },
    { id: 'devops', label: 'DevOps', icon: Wrench },
];


interface SkillCardProps {
    name: string;
    level: number;
    accent: string;
    size: 'sm' | 'md' | 'lg';
    index: number;
    isInView: boolean;
    icon: IconType;
}

function SkillCard({ name, level, accent, size, index, isInView, icon: Icon }: SkillCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    const sizeClasses = {
        sm: 'col-span-1 row-span-1',
        md: 'col-span-1 sm:col-span-2 row-span-1',
        lg: 'col-span-1 sm:col-span-2 row-span-2',
    };

    const iconSizes = {
        sm: 'text-3xl sm:text-4xl',
        md: 'text-4xl sm:text-5xl',
        lg: 'text-5xl sm:text-6xl',
    };

    const cardPadding = {
        sm: 'p-4',
        md: 'p-5 sm:p-6',
        lg: 'p-5 sm:p-8',
    };

    const nameSizes = {
        sm: 'text-lg',
        md: 'text-xl sm:text-2xl',
        lg: 'text-2xl sm:text-3xl', // 2rem ≈ 3xl
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            animate={isInView ? {
                opacity: 1,
                y: 0,
                scale: 1,
            } : {
                opacity: 0,
                y: 60,
                scale: 0.9
            }}
            transition={{
                delay: index * 0.06,
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1]
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{
                scale: 1.02,
                y: -12,
                transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
            }}
            className={`group relative ${sizeClasses[size]} cursor-pointer`}
        >
            {/* Main Card */}
            <div
                className={`relative h-full rounded-2xl sm:rounded-3xl backdrop-blur-2xl overflow-hidden transition-all duration-500 ${cardPadding[size]}`}
                style={{
                    backgroundColor: `color-mix(in oklch, ${accent} 8%, rgba(10, 10, 15, 0.6))`,
                    border: `2px solid ${isHovered ? accent : 'rgba(255,255,255,0.08)'}`,
                    boxShadow: isHovered
                        ? `0 25px 80px -15px ${accent}60, 0 0 0 1px ${accent}30, inset 0 1px 0 rgba(255,255,255,0.1)`
                        : '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.05)'
                }}
            >
                {/* Animated Mesh Gradient Background */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                    animate={isHovered ? {
                        background: [
                            `radial-gradient(circle at 0% 0%, ${accent}20 0%, transparent 50%)`,
                            `radial-gradient(circle at 100% 100%, ${accent}20 0%, transparent 50%)`,
                            `radial-gradient(circle at 0% 100%, ${accent}20 0%, transparent 50%)`,
                            `radial-gradient(circle at 100% 0%, ${accent}20 0%, transparent 50%)`,
                            `radial-gradient(circle at 0% 0%, ${accent}20 0%, transparent 50%)`,
                        ]
                    } : {}}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />

                {/* Top Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden pointer-events-none">
                    <motion.div
                        className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-10"
                        style={{ backgroundColor: accent }}
                        animate={isHovered ? {
                            scale: [1, 1.2, 1],
                            opacity: [0.1, 0.2, 0.1]
                        } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                </div>

                {/* Noise Texture Overlay */}
                <div
                    className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay"
                    style={{
                        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")'
                    }}
                />

                {/* Content */}
                <div className="relative h-full flex flex-col">
                    {/* Header: Icon + Badge */}
                    <motion.div
                        className="flex items-start justify-between mb-auto"
                        animate={isHovered ? { y: -4 } : { y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Icon Container */}
                        <motion.div
                            className="relative p-3 sm:p-4 rounded-2xl transition-all duration-500"
                            style={{
                                backgroundColor: `color-mix(in oklch, ${accent} ${isHovered ? '20' : '12'}%, transparent)`,
                                border: `1px solid ${isHovered ? `${accent}60` : 'rgba(255,255,255,0.08)'}`,
                            }}
                            whileHover={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5 }}
                        >
                            <Icon
                                className={`${iconSizes[size]} transition-all duration-300`}
                                style={{
                                    color: accent,
                                    filter: isHovered ? 'drop-shadow(0 0 8px currentColor)' : 'none'
                                }}
                            />

                            {/* Icon Glow */}
                            {isHovered && (
                                <motion.div
                                    className="absolute inset-0 rounded-2xl blur-xl -z-10"
                                    style={{ backgroundColor: accent }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.3 }}
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                        </motion.div>

                        {/* Floating Level Badge */}
                        <motion.div
                            className="relative px-3 py-1 sm:px-4 sm:py-2 rounded-full font-black text-xs sm:text-sm backdrop-blur-xl"
                            style={{
                                backgroundColor: `color-mix(in oklch, ${accent} 25%, transparent)`,
                                color: accent,
                                border: `2px solid ${accent}60`,
                                boxShadow: `0 4px 16px ${accent}30`
                            }}
                            animate={isHovered ? {
                                y: [-2, -6, -2],
                                scale: 1.05,
                            } : { y: 0, scale: 1 }}
                            transition={{
                                y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                                scale: { duration: 0.3 }
                            }}
                        >
                            {level}%

                            {/* Badge Sparkle */}
                            <motion.div
                                className="absolute -top-1 -right-1 w-2 h-2 rounded-full"
                                style={{ backgroundColor: accent }}
                                animate={{
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.div>
                    </motion.div>

                    {/* Footer: Name + Progress */}
                    <motion.div
                        className="mt-auto space-y-2 sm:space-y-3"
                        animate={isHovered ? { y: -2 } : { y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Skill Name */}
                        <h3
                            className={`font-black text-foreground tracking-tight leading-none ${nameSizes[size]}`}
                            style={{
                                textShadow: isHovered ? `0 0 20px ${accent}40` : 'none'
                            }}
                        >
                            {name}
                        </h3>

                        {/* Enhanced Progress Bar */}
                        <div className="relative">
                            {/* Background Track */}
                            <div className="h-1.5 sm:h-2 bg-white/5 rounded-full overflow-hidden backdrop-blur-sm">
                                {/* Animated Fill */}
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={isInView ? { width: `${level}%` } : { width: 0 }}
                                    transition={{
                                        delay: index * 0.06 + 0.4,
                                        duration: 1.2,
                                        ease: [0.16, 1, 0.3, 1]
                                    }}
                                    className="h-full relative rounded-full"
                                    style={{
                                        background: `linear-gradient(90deg, ${accent}80, ${accent})`,
                                    }}
                                >
                                    {/* Shimmer Effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                        animate={{ x: ['-100%', '200%'] }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "linear",
                                            repeatDelay: 1
                                        }}
                                    />

                                    {/* Glow */}
                                    <div
                                        className="absolute inset-0 blur-sm opacity-50"
                                        style={{ backgroundColor: accent }}
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Inner Glow Border */}
                <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        boxShadow: `inset 0 0 60px ${accent}20`
                    }}
                />
            </div>

            {/* Outer Dramatic Glow */}
            <motion.div
                className="absolute -inset-2 rounded-3xl blur-2xl -z-10 pointer-events-none"
                style={{ backgroundColor: accent }}
                animate={{
                    opacity: isHovered ? 0.4 : 0,
                }}
                transition={{ duration: 0.4 }}
            />

            {/* Light Rays on Hover */}
            {isHovered && (
                <motion.div
                    className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    exit={{ opacity: 0 }}
                >
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute inset-y-0 w-px"
                            style={{
                                background: `linear-gradient(180deg, transparent, ${accent}40, transparent)`,
                                left: `${25 + i * 25}%`
                            }}
                            animate={{
                                opacity: [0, 0.6, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3,
                                ease: "easeInOut"
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
}

export function SkillsSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [activeFilter, setActiveFilter] = useState('all');

    const filteredSkills = activeFilter === 'all'
        ? allSkills
        : allSkills.filter(skill => skill.category === activeFilter);

    return (
        <section
            id="skills"
            ref={ref}
            className="relative py-24 sm:py-32 overflow-hidden bg-background"
        >
            {/* Premium Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(2,6,23,0.8)_100%)] opacity-40" />
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-10 sm:mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-[0.6rem] sm:text-xs font-bold uppercase tracking-[0.2em] bg-primary/10 text-primary border border-primary/20 mb-4 sm:mb-6 mx-auto">
                        <Cpu className="w-3 h-3 sm:w-4 sm:h-4" />
                        Technical Proficiency
                    </div>
                    <h2 className="text-3xl sm:text-5xl md:text-6xl font-black mb-4 sm:mb-8 tracking-tight">
                        Powering <span className="gradient-text">Experiences.</span>
                    </h2>
                    <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                        A comprehensive toolkit of modern technologies I use to architect and build high-performance digital products.
                    </p>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-16"
                >
                    {categories.map((cat, idx) => (
                        <motion.button
                            key={cat.id}
                            onClick={() => setActiveFilter(cat.id)}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 + idx * 0.1, duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                            whileHover={{
                                scale: 1.1,
                                y: -3,
                                transition: { duration: 0.2 }
                            }}
                            whileTap={{ scale: 0.95 }}
                            className={`group relative px-4 py-2 sm:px-6 sm:py-3 rounded-full font-bold text-xs sm:text-sm transition-all duration-300 flex items-center gap-1.5 sm:gap-2 overflow-hidden ${activeFilter === cat.id
                                ? 'bg-primary text-primary-foreground shadow-lg'
                                : 'glass border border-white/10 text-muted-foreground hover:border-white/30 hover:text-foreground'
                                }`}
                        >
                            {/* Background glow on active */}
                            {activeFilter === cat.id && (
                                <motion.div
                                    layoutId="activeFilter"
                                    className="absolute inset-0 bg-primary -z-10"
                                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                                />
                            )}

                            {/* Icon with rotation on hover */}
                            <motion.div
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                            >
                                <cat.icon className="w-3 h-3 sm:w-4 sm:h-4" />
                            </motion.div>

                            {cat.label}

                            {/* Shimmer effect on hover */}
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -z-10"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: '100%' }}
                                transition={{ duration: 0.6 }}
                            />
                        </motion.button>
                    ))}
                </motion.div>

                {/* Skills Bento Grid */}
                <motion.div
                    layout
                    className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 auto-rows-[160px] sm:auto-rows-[200px]"
                >
                    {filteredSkills.map((skill, index) => (
                        <SkillCard
                            key={skill.name}
                            name={skill.name}
                            level={skill.level}
                            accent={skill.accent}
                            size={skill.size}
                            icon={skill.icon}
                            index={index}
                            isInView={isInView}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
