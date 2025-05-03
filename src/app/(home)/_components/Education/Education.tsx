'use client'
import React from "react";

import { motion } from "framer-motion";
import { GraduationCap, Book, Calendar, Award } from "lucide-react";
import Title from "@/components/Shared/Title";

export default function EducationSection() {
  const educationData = [
    {
      id: 1,
      degree: "Diploma in Computer Science and Technology",
      institution: "Dhaka Polytechnic Institute",
      duration: "2022 - 2026 (Expected)",
      gpa: "In Progress",
      description: "Focusing on software development, database management, and web technologies."
    },
    {
      id: 2,
      degree: "Secondary School Certificate (SSC)",
      institution: "Thakurgaon Govt Boys High School",
      duration: "2019 - 2021",
      gpa: "GPA: 5.00 out of 5.00",
      description: "Achieved perfect GPA in Science group with excellence in Mathematics and Computer Science."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="bg-[#0c0a09] shadow-[0px_0px_65px_65px_#0c0a09] z-10 relative py-24 w-full overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
            <Title title="Education" description="My academic journey and qualifications"/>
        
        </motion.div>

        {/* Education Timeline Tree */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          {/* Timeline Stem */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 to-red-900 transform -translate-x-1/2"></div>
          
          {educationData.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="mb-16 relative"
            >
              {/* Timeline Node */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-red-600 rounded-full shadow-lg shadow-red-600/40 z-10 transform -translate-x-1/2 flex items-center justify-center">
                <GraduationCap size={18} className="text-neutral-900" />
              </div>

              {/* Content Card - Alternating Left/Right */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Side (Empty for even indexes on desktop) */}
                <div className={`hidden md:block ${index % 2 === 0 ? "order-1" : "order-1"}`}>
                  {index % 2 !== 0 && (
                    <motion.div 
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(185, 28, 28, 0.3)" }}
                      transition={{ duration: 0.3 }}
                      className="bg-neutral-800 p-6 rounded-lg border-r-4 border-red-600 shadow-lg ml-auto mr-6 w-full"
                    >
                      <h3 className="font-bold text-xl text-white mb-2">
                        {item.degree}
                      </h3>
                      <div className="flex items-center text-neutral-300 mb-1">
                        <Book size={16} className="mr-2 text-red-500" />
                        <span>{item.institution}</span>
                      </div>
                      <div className="flex items-center text-neutral-400 mb-2">
                        <Calendar size={16} className="mr-2 text-red-500" />
                        <span>{item.duration}</span>
                      </div>
                      <div className="py-1 px-3 bg-red-600/10 rounded-full inline-flex items-center text-red-400 mb-3">
                        <Award size={16} className="mr-2" />
                        <span>{item.gpa}</span>
                      </div>
                      <p className="text-neutral-300">{item.description}</p>
                    </motion.div>
                  )}
                </div>
                
                {/* Right Side (Empty for odd indexes on desktop) */}
                <div className={`${index % 2 === 0 ? "order-2" : "order-2"}`}>
                  {index % 2 === 0 ? (
                    <motion.div 
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(185, 28, 28, 0.3)" }}
                      transition={{ duration: 0.3 }}
                      className="bg-neutral-800 p-6 rounded-lg border-l-4 border-red-600 shadow-lg ml-14 md:ml-6 w-full"
                    >
                      <h3 className="font-bold text-xl text-white mb-2">
                        {item.degree}
                      </h3>
                      <div className="flex items-center text-neutral-300 mb-1">
                        <Book size={16} className="mr-2 text-red-500" />
                        <span>{item.institution}</span>
                      </div>
                      <div className="flex items-center text-neutral-400 mb-2">
                        <Calendar size={16} className="mr-2 text-red-500" />
                        <span>{item.duration}</span>
                      </div>
                      <div className="py-1 px-3 bg-red-600/10 rounded-full inline-flex items-center text-red-400 mb-3">
                        <Award size={16} className="mr-2" />
                        <span>{item.gpa}</span>
                      </div>
                      <p className="text-neutral-300">{item.description}</p>
                    </motion.div>
                  ) : (
                    // Only show on mobile for odd indexes
                    <motion.div 
                      whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(185, 28, 28, 0.3)" }}
                      transition={{ duration: 0.3 }}
                      className="bg-neutral-800 p-6 rounded-lg border-l-4 border-red-600 shadow-lg ml-14 md:hidden w-full"
                    >
                      <h3 className="font-bold text-xl text-white mb-2">
                        {item.degree}
                      </h3>
                      <div className="flex items-center text-neutral-300 mb-1">
                        <Book size={16} className="mr-2 text-red-500" />
                        <span>{item.institution}</span>
                      </div>
                      <div className="flex items-center text-neutral-400 mb-2">
                        <Calendar size={16} className="mr-2 text-red-500" />
                        <span>{item.duration}</span>
                      </div>
                      <div className="py-1 px-3 bg-red-600/10 rounded-full inline-flex items-center text-red-400 mb-3">
                        <Award size={16} className="mr-2" />
                        <span>{item.gpa}</span>
                      </div>
                      <p className="text-neutral-300">{item.description}</p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Tree Root/End */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute left-4 md:left-1/2 bottom-0 w-6 h-6 bg-red-700 rounded-full transform -translate-x-1/2 translate-y-3 z-10"
          />
        </motion.div>
      </div>
    </div>
  );
}