"use client";

import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Title from "@/components/Shared/Title";
import Image from "next/image";
import { motion, useInView } from "framer-motion";


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
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  
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



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section
      id="skills"
      className="bg-[#0c0a09] shadow-[0px_0px_65px_65px_#0c0a09] relative py-24 w-full overflow-hidden"
      ref={containerRef}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-1/4 left-1/3 w-96 h-96 rounded-full bg-red-600/5 filter blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-blue-600/5 filter blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.1, 0.05]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Title 
          title="TECHNICAL EXPERTISE" 
          description="Advanced development skills with modern frameworks and technologies"
        />

        <motion.div
          className="mt-16 relative"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Left Fade */}
          <div className="absolute hidden md:block top-0 left-0 w-16 h-full bg-gradient-to-r from-[#0c0a09] to-transparent z-10 pointer-events-none" />

          {/* Right Fade */}
          <div className="absolute hidden md:block top-0 right-0 w-16 h-full bg-gradient-to-l from-[#0c0a09] to-transparent z-10 pointer-events-none" />

          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            speed={4000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            freeMode={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 25,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            className="py-8"
          >
            {data.map((skill, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className="backdrop-blur-sm bg-black/80 group p-8 flex flex-col items-center rounded-2xl border border-gray-800 hover:border-red-500 duration-300 shadow-lg text-center h-full"
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 20px 25px -5px rgba(220, 38, 38, 0.1), 0 10px 10px -5px rgba(220, 38, 38, 0.04)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative flex items-center justify-center mb-6">
                    {/* Circular progress background */}
                    <svg className="w-28 h-28 transform -rotate-90">
                      <circle
                        cx="56"
                        cy="56"
                        r="54"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="transparent"
                        className="text-gray-800"
                      />
                      <motion.circle
                        cx="56"
                        cy="56"
                        r="54"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="transparent"
                        strokeDasharray="339.292"
                        strokeDashoffset={339.292 * (1 - parseInt(skill.percentage) / 100)}
                        className="text-red-600 group-hover:text-red-500 transition-colors duration-300"
                        initial={{ strokeDashoffset: 339.292 }}
                        animate={{ strokeDashoffset: 339.292 * (1 - parseInt(skill.percentage) / 100) }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </svg>

                    {/* Glowing Background */}
                    <div className="absolute w-16 h-16 bg-red-600/20 group-hover:bg-red-500/30 transition-all rounded-full blur-xl"></div>

                    {/* Skill icon */}
                    <div className="absolute flex items-center justify-center w-full h-full">
                      <Image
                        src={skillIcons[skill.name]}
                        height={55}
                        width={55}
                        alt={skill.name}
                        className="h-14 w-14 relative z-10 transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Percentage text */}
                    <div className="absolute -bottom-1 bg-gray-900 text-red-500 group-hover:text-red-400 font-mono font-bold px-3 py-1 text-sm rounded-full border border-gray-800 group-hover:border-red-500/30 transition-all duration-300 shadow-lg">
                      {skill.percentage}%
                    </div>
                  </div>

                  <h3 className="text-white font-semibold text-lg tracking-wider mt-2 group-hover:text-red-500 transition-colors duration-300">
                    {skill.name}
                  </h3>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default Skill;