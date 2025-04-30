"use client";

import { useRef } from "react";
import Title from "@/components/Shared/Title";
import { Button } from "@/components/ui/button";
import { ArrowDownToLine, Send } from "lucide-react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const data = {
    _id: "65b7abb3ed5527627f4f6fa2",
    placeholder: "about",
    about: "Hey there! I'm Ruhul Amin, a passionate web developer with a knack for crafting immersive and user-friendly digital experiences. My journey into the world of programming began with a deep dive into technologies like React, Node.js, and JavaScript.\n\nI have expertise in HTML and CSS. My toolbox includes Tailwind CSS and Bootstrap for responsive and visually appealing designs.\n\nSpecializing in MERN (MongoDB, Express.js, React, Node.js) stack development, I seamlessly integrate front-end and back-end technologies to deliver robust and scalable solutions. My proficiency extends to database management with MongoDB, ensuring data is not just stored but optimized for efficient retrieval.\n\nLet's collaborate and turn your ideas into reality! Whether you're looking to enhance user experiences, streamline workflows, or create a dynamic web presence, I'm here to bring your vision to life.",
    resumeURL: "https://docs.google.com/document/d/1HNn6EsjwJ9kXSgB8iMhfaqcZCl_4LB9BKt8KY7L5zB4/edit?usp=sharing",
    selfImgDisplayURL: "/ProfileImage.jpg"
  };

  return (
    <section
      id="about"
      className="bg-[#0c0a09] shadow-[0px_0px_65px_65px_#0c0a09] z-10 relative py-24 w-full overflow-hidden"
      ref={ref}
    >
      {/* Background subtle elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-red-600/5 filter blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-red-600/5 filter blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Title title="ABOUT ME" description="Get to know more about my skills and experience" />
        
        <div className="mt-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-96"
          >
            
            <div className="relative bg-gradient-to-br from-gray-900 to-black overflow-hidden rounded-2xl border border-gray-800">
              
              <div className=" overflow-hidden">
                <Image
                  src={data.selfImgDisplayURL}
                  alt="Ruhul Amin Profile Image"
                  width={500}
                  height={900}
                  className="w-full h-auto rounded-t-xl object-cover"
                />
              </div>
            </div>
          </motion.div>
          
          {/* About Text and Action Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-full "
          >
            <div className="space-y-6">
              {/* Section indicators */}
              <div className="flex items-center gap-2">
                <div className="h-px w-6 bg-red-500"></div>
                <span className="text-red-500 font-medium">Web Developer</span>
              </div>
              
              {/* About text */}
              <div className="text-gray-300 text-sm space-y-4">
                {data.about.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-t border-b border-gray-800">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">3+</div>
                  <div className="text-gray-400 text-sm">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">50+</div>
                  <div className="text-gray-400 text-sm">Projects Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">12+</div>
                  <div className="text-gray-400 text-sm">Happy Clients</div>
                </div>
              </div>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Button className="relative overflow-hidden group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-300">
                  <span className="relative z-10 flex items-center gap-2">
                    <Send size={16} /> Contact Me
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                </Button>
                
                <Button
                  variant="outline"
                  className="group border-gray-700 hover:border-red-500 hover:bg-transparent transition-all duration-300"
                  onClick={() => window.open(data.resumeURL, "_blank")}
                >
                  <span className="flex items-center gap-2">
                    <ArrowDownToLine size={16} className="group-hover:text-red-500 transition-colors duration-300" />
                    <span className="group-hover:text-red-500 transition-colors duration-300">Download CV</span>
                  </span>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;