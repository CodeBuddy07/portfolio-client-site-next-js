"use client";

import { useRef } from "react";
import Title from "@/components/Shared/Title";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import {
  Code2,
  Database,
  LayoutDashboard,
  ServerCog,
  PlugZap,
  LifeBuoy
} from "lucide-react";

const services = [
  {
    name: "Custom Web Application Development",
    description: "Build customized web applications tailored to your business needs with high performance and scalability.",
    icon: Code2,
  },
  {
    name: "Database Integration and Management",
    description: "Efficient MongoDB integration for fast and reliable data storage and management.",
    icon: Database,
  },
  {
    name: "Full Stack Web Development",
    description: "Seamless full-stack development using MERN: MongoDB, Express, React, and Node.js.",
    icon: LayoutDashboard,
  },
  {
    name: "RESTful API Development",
    description: "Robust and scalable REST APIs for secure and fast data communication.",
    icon: ServerCog,
  },
  {
    name: "Third-Party API Integration",
    description: "Enhance functionality with smooth third-party API integrations into your applications.",
    icon: PlugZap,
  },
  {
    name: "Maintenance and Support",
    description: "Ongoing maintenance, support, and optimization for your deployed applications.",
    icon: LifeBuoy,
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  }
};

const glowVariants = {
  initial: { opacity: 0.3, scale: 1 },
  hover: {
    opacity: 0.6,
    scale: 1.05,
    transition: { duration: 0.8, ease: "easeInOut" }
  }
};

const Services = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });


  return (
    <section id="services" className="bg-[#0c0a09] shadow-[0px_0px_65px_65px_#0c0a09] relative py-24 w-full overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-red-600/10 filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-blue-600/10 filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Title
          eyebrow="expertise"
          title="WHAT I DO"
          highlight="DO"
          description="Crafting fast, scalable, and modern web solutions with clean code and a user-first approach."
        />

        <motion.div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="h-full"
              >
                <Card className="relative h-full overflow-hidden bg-black/80 border border-gray-800 hover:border-red-500/50 transition-all duration-300">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-red-600/20 to-blue-600/5 rounded-2xl"
                    variants={glowVariants}
                    initial="initial"
                    whileHover="hover"
                  />

                  <CardContent className="p-6 space-y-6 h-full flex flex-col">
                    <div className="flex items-center gap-4">
                      <div className="bg-gradient-to-br from-red-500 to-red-700 p-3 rounded-xl shadow-lg shadow-red-500/20">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white tracking-tight">{service.name}</h3>
                    </div>

                    <p className="text-gray-400 flex-grow">
                      {service.description}
                    </p>

                    <div className="pt-4">
                      <motion.div
                        className="h-1 w-12 bg-gradient-to-r from-red-500 to-red-700 rounded-full"
                        whileHover={{ width: "100%", transition: { duration: 0.5 } }}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;