'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { HoverGallery } from '@/components/ui/HoverGallery';

export function GallerySection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    return (
        <section
            id="gallery"
            ref={ref}
            className="relative py-24 sm:py-32 overflow-hidden bg-background/50"
        >
            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-secondary/10 text-secondary border border-secondary/20 mb-4">
                        Visuals
                    </span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                        Image <span className="gradient-text">Gallery</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        A visual exploration of my recent work and design experiments.
                    </p>
                </motion.div>

                <HoverGallery />
            </div>
        </section>
    );
}
