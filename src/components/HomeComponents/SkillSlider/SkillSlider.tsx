"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Title from "@/components/Shared/Title";
import Image from "next/image";

const skillIcons = {
    REACT: "https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/react/react-original.svg",
    TYPESCRIPT: "https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/typescript/typescript-original.svg",
    TAILWIND: "https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/tailwindcss/tailwindcss-original.svg",
    "NEXT JS": "https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/nextjs/nextjs-original.svg",
    "EXPRESS JS": "https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/express/express-original.svg",
    BOOTSTRAP: "https://raw.githubusercontent.com/devicons/devicon/6910f0503efdd315c8f9b858234310c06e04d9c0/icons/bootstrap/bootstrap-original.svg",
    "JAVA SCRIPT": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    NODE: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    "MONGO DB": "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
};

const Skill = () => {
    const data: { name: keyof typeof skillIcons; percentage: string }[] = [
        { name: "REACT", percentage: "92" },
        { name: "TYPESCRIPT", percentage: "92" },
        { name: "TAILWIND", percentage: "96" },
        { name: "NEXT JS", percentage: "80" },
        { name: "EXPRESS JS", percentage: "87" },
        { name: "BOOTSTRAP", percentage: "74" },
        { name: "JAVA SCRIPT", percentage: "94" },
        { name: "NODE", percentage: "82" },
        { name: "MONGO DB", percentage: "87" },
    ];

    return (
        <div
            id="skill"
            className="bg-[#131313] shadow-[0px_0px_65px_65px_#131313] relative w-full py-20"
        >
            <Title title="WHAT I KNOW" />

            <div className="relative container mx-auto px-4 mt-20">
                {/* Left Fade */}
                <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-[#131313] to-transparent z-10 pointer-events-none" />

                {/* Right Fade */}
                <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-[#131313] to-transparent z-10 pointer-events-none" />

                {/* Your Swiper Carousel */}
                <Swiper
                    modules={[Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    speed={4000} // 4 seconds for 1 full transition
                    autoplay={{
                        delay: 0, // 0 ms delay between slides
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true, // Pause on hover
                    }}
                    loop={true} // Continuous loop
                    freeMode={true} // Free mode for smoothness
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 4,
                        },
                    }}
                    className="pt-10"
                >
                    {data.map((skill, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="bg-[#1F1F1F] group p-6 flex flex-col items-center rounded-2xl border border-gray-700 hover:border-red-600 duration-500 text-center"
                            >
                                <div className="relative  flex items-center justify-center">
                                    {/* Glowing Background */}
                                    <div className="absolute w-16 h-16 bg-red-600 group-hover:bg-red-400 transition-all rounded-full blur-2xl opacity-50"></div>

                                    {/* Image itself */}
                                    <Image
                                        src={skillIcons[skill.name]}
                                        height={55}
                                        width={55}
                                        alt={skill.name}
                                        className="h-[55px] mb-4 relative z-10"
                                    />
                                </div>


                                <p className="text-white font-semibold text-xl mb-3">{skill.name}</p>
                                <h3 className="bg-[#070707] group-hover:bg-red-600 duration-500 px-8 py-2 rounded-lg text-xl text-[#A7A7A7] group-hover:text-black font-semibold">
                                    {skill.percentage}%
                                </h3>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>



        </div>
    );
};

export default Skill;
