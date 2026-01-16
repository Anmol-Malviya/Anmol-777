"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

const images = [
    {
        src: "/projects/image-1.png",
        alt: "Featured Work 1",
        code: "# 01",
    },
    {
        src: "/projects/gallery-2.jpeg",
        alt: "Featured Work 2",
        code: "# 02",
    },
    {
        src: "/projects/gallery-3.jpeg",
        alt: "Featured Work 3",
        code: "# 03",
    },
    {
        src: "/projects/gallery-4.jpeg",
        alt: "Featured Work 4",
        code: "# 04",
    },
    {
        src: "/projects/gallery-5.jpeg",
        alt: "Featured Work 5",
        code: "# 05",
    },
    {
        src: "/projects/gallery-6.jpeg",
        alt: "Featured Work 6",
        code: "# 06",
    },
    {
        src: "/gallery/gallery-1.jpg",
        alt: "Featured Work 7",
        code: "# 07",
    },
    {
        src: "/gallery/gallery-2.jpg",
        alt: "Featured Work 8",
        code: "# 08",
    },
    {
        src: "/gallery/gallery-3.jpg",
        alt: "Featured Work 9",
        code: "# 09",
    },
];

export const HoverGallery = () => {
    return (
        <div className="flex h-full w-full items-center justify-center overflow-hidden py-10">
            <HoverExpand_001 className="" images={images} />
        </div>
    );
};

const HoverExpand_001 = ({
    images,
    className,
}: {
    images: { src: string; alt: string; code: string }[];
    className?: string;
}) => {
    const [activeImage, setActiveImage] = useState<number | null>(0);

    return (
        <motion.div
            initial={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
                duration: 0.3,
                delay: 0.5,
            }}
            className={cn("relative w-full max-w-full px-4 sm:px-8", className)}
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full overflow-x-auto no-scrollbar pb-8 pt-4"
            >
                <div className="flex min-w-fit w-full items-center justify-start lg:justify-center gap-2 px-2">
                    {images.map((image, index) => (
                        <motion.div
                            key={index}
                            className="relative cursor-pointer overflow-hidden rounded-3xl"
                            initial={{ width: "4rem", height: "20rem" }}
                            animate={{
                                width: activeImage === index ? "24rem" : "5rem",
                                height: activeImage === index ? "24rem" : "24rem",
                            }}
                            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                            onClick={() => setActiveImage(index)}
                            onHoverStart={() => setActiveImage(index)}
                        >
                            <AnimatePresence>
                                {activeImage === index && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute h-full w-full bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10"
                                    />
                                )}
                            </AnimatePresence>
                            <AnimatePresence>
                                {activeImage === index && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute flex h-full w-full flex-col items-start justify-end p-6 z-20"
                                    >
                                        <p className="text-left text-lg font-bold text-white tracking-wide">
                                            {image.code}
                                        </p>
                                        <p className="text-left text-sm font-medium text-white/80 mt-2">
                                            {image.alt}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <img
                                src={image.src}
                                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                                alt={image.alt}
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
};
