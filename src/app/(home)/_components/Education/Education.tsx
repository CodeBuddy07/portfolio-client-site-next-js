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
    <div className="bg-[#0c0a09] shadow-[0px_0px_65px_65px_#0c0a09] z-10 relative py-12 md:py-24 w-full overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 text-center"
        >
          <Title
            eyebrow="academic journey"
            title="MY EDUCATION"
            highlight="EDUCATION"
            description="My academic journey and qualifications"
          />
        </motion.div>

        {/* Education Timeline Tree */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          {/* Timeline Stem - Mobile (left aligned) */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 to-red-900 md:hidden"></div>

          {/* Timeline Stem - Desktop (centered) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 to-red-900 transform -translate-x-1/2"></div>

          {educationData.map((item, index) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="mb-12 md:mb-16 relative"
            >
              {/* Timeline Node - Mobile */}
              <div className="absolute left-0 md:left-1/2 w-8 h-8 bg-red-600 rounded-full shadow-lg shadow-red-600/40 z-10 transform -translate-x-1/2 flex items-center justify-center">
                <GraduationCap size={18} className="text-neutral-900" />
              </div>

              {/* Content Card */}
              <div className="ml-14 md:ml-0">
                <motion.div
                  whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(185, 28, 28, 0.3)" }}
                  transition={{ duration: 0.3 }}
                  className={`
                    bg-stone-900 p-5 sm:p-6 rounded-lg shadow-lg w-full
                    ${index % 2 === 0 ?
                      'md:mr-auto md:max-w-[calc(50%-40px)] md:border-l-4 md:border-red-600' :
                      'md:ml-auto md:max-w-[calc(50%-40px)] md:border-r-4 md:border-red-600'
                    }
                  `}
                >
                  <h3 className="font-bold text-lg sm:text-xl text-white mb-2">
                    {item.degree}
                  </h3>
                  <div className="flex items-center text-sm sm:text-base text-neutral-300 mb-1">
                    <Book size={16} className="mr-2 text-red-500 min-w-[16px]" />
                    <span>{item.institution}</span>
                  </div>
                  <div className="flex items-center text-sm sm:text-base text-neutral-400 mb-2">
                    <Calendar size={16} className="mr-2 text-red-500 min-w-[16px]" />
                    <span>{item.duration}</span>
                  </div>
                  <div className="py-1 px-3 bg-red-600/10 rounded-full inline-flex items-center text-sm sm:text-base text-red-400 mb-3">
                    <Award size={16} className="mr-2 min-w-[16px]" />
                    <span>{item.gpa}</span>
                  </div>
                  <p className="text-sm sm:text-base text-neutral-300">{item.description}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}

          {/* Tree Root/End */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute left-8 md:left-1/2 bottom-0 w-6 h-6 bg-red-700 rounded-full transform -translate-x-1/2 translate-y-3 z-10"
          />
        </motion.div>
      </div>
    </div>
  );
}