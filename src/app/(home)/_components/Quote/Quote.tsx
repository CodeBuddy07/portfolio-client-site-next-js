"use client";

import { QuoteIcon } from 'lucide-react';
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax';
import { motion } from 'framer-motion';

const Quote = () => {
    const data = {
        _id: "65b7af8aed5527627f5169c2",
        placeholder: "quote",
        bgImgDisplayURL: "/QuoteBG.jpg",
        quote: "You might not think that programmers are artists, but programming is an extremely creative profession. It’s logic-based creativity.",
        writer: "John Romero",
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Parallax Background */}
            <ParallaxBanner
                layers={[
                    {
                        image: data.bgImgDisplayURL,
                        speed: -20,
                        style: {
                            objectFit: "cover",
                            objectPosition: "center",
                        },
                    },
                ]}
                className="absolute inset-0 w-full h-full"
            >
                <ParallaxBannerLayer>
                    <div className="relative z-10 w-full xl:px-80 lg:px-32 px-5 py-60">

                        {/* Animated Quote Icon */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ type: "spring", stiffness: 100, damping: 10 }}
                        >
                            <QuoteIcon size={60} stroke="red" />
                        </motion.div>

                        {/* Animated Quote Text */}
                        <motion.p
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                            className="text-4xl text-gray-200 mt-10"
                        >
                            {data.quote}
                        </motion.p>

                        {/* Animated Writer Name */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="py-1 px-2 mt-10 border-l border-gray-500"
                        >
                            <p className="text-sm text-gray-500 italic">{data.writer}</p>
                        </motion.div>

                    </div>
                </ParallaxBannerLayer>
            </ParallaxBanner>
        </div>
    );
};

export default Quote;
