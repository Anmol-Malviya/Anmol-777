'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Github, Linkedin, Instagram, ArrowUpRight, Send } from 'lucide-react';

const contactInfo = [
    {
        icon: Mail,
        label: 'Email',
        value: 'anmolmalviya4328@gmail.com',
        href: 'mailto:anmolmalviya4328@gmail.com',
        color: 'oklch(0.7 0.25 265)'
    },
    {
        icon: Github,
        label: 'GitHub',
        value: 'github.com/anmol0706',
        href: 'https://github.com/anmol0706',
        color: 'oklch(0.65 0.2 340)'
    },
    {
        icon: Linkedin,
        label: 'LinkedIn',
        value: 'linkedin.com/in/anmol-malviya27',
        href: 'https://www.linkedin.com/in/anmol-malviya27/',
        color: 'oklch(0.55 0.3 175)'
    },
    {
        icon: Instagram,
        label: 'Instagram',
        value: '@anmol_20_7_',
        href: 'https://www.instagram.com/anmol_20_7_/?hl=en',
        color: 'oklch(0.6 0.25 300)'
    },
];

export function ContactSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section
            id="contact"
            ref={ref}
            className="relative py-24 sm:py-32 overflow-hidden bg-background"
        >
            {/* Animated Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0)_0%,rgba(2,6,23,0.9)_100%)] opacity-50" />

                {/* Gradient Orbs */}
                <motion.div
                    className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-20"
                    style={{ background: 'oklch(0.7 0.25 265)' }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20"
                    style={{ background: 'oklch(0.65 0.2 340)' }}
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.2, 0.3],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
            </div>

            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-[0.2em] bg-primary/10 text-primary border border-primary/20 mb-6">
                        <Send className="w-4 h-4" />
                        Let&apos;s Connect
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
                        Get In <span className="gradient-text">Touch</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                        I&apos;m always open to new opportunities and collaborations. Feel free to reach out!
                    </p>
                </motion.div>

                {/* Contact Cards Grid */}
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {contactInfo.map((item, index) => (
                        <motion.a
                            key={item.label}
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                            transition={{ delay: index * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{
                                y: -8,
                                scale: 1.02,
                                transition: { duration: 0.3 }
                            }}
                            className="group relative p-8 rounded-3xl backdrop-blur-2xl border-2 cursor-pointer overflow-hidden"
                            style={{
                                backgroundColor: `color-mix(in oklch, ${item.color} 5%, rgba(10, 10, 15, 0.6))`,
                                borderColor: 'rgba(255,255,255,0.08)',
                            }}
                        >
                            {/* Hover Gradient */}
                            <motion.div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle at 50% 50%, ${item.color}15, transparent 70%)`
                                }}
                                transition={{ duration: 0.4 }}
                            />

                            {/* Content */}
                            <div className="relative flex items-center gap-6">
                                {/* Icon */}
                                <motion.div
                                    className="p-4 rounded-2xl backdrop-blur-sm transition-all duration-500"
                                    style={{
                                        backgroundColor: `color-mix(in oklch, ${item.color} 15%, transparent)`,
                                        border: `1px solid ${item.color}40`,
                                    }}
                                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <item.icon
                                        className="w-8 h-8"
                                        style={{ color: item.color }}
                                    />
                                </motion.div>

                                {/* Text */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">
                                        {item.label}
                                    </p>
                                    <p className="text-lg font-black text-foreground truncate">
                                        {item.value}
                                    </p>
                                </div>

                                {/* Arrow Icon */}
                                <motion.div
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    animate={{ x: [0, 4, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <ArrowUpRight
                                        className="w-6 h-6"
                                        style={{ color: item.color }}
                                    />
                                </motion.div>
                            </div>

                            {/* Glow Effect */}
                            <motion.div
                                className="absolute -inset-1 rounded-3xl blur-2xl -z-10 pointer-events-none opacity-0 group-hover:opacity-40"
                                style={{ backgroundColor: item.color }}
                                transition={{ duration: 0.4 }}
                            />

                            {/* Border Glow on Hover */}
                            <div
                                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                                style={{
                                    border: `2px solid ${item.color}`,
                                }}
                            />
                        </motion.a>
                    ))}
                </div>

                {/* Additional CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-center mt-16"
                >
                    <p className="text-muted-foreground text-sm">
                        Or download my{' '}
                        <a
                            href="/resume.pdf"
                            className="text-primary font-bold hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            resume
                        </a>
                        {' '}to learn more about my experience.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
