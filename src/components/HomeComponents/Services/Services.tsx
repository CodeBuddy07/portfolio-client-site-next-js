"use client";

import Title from "@/components/Shared/Title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
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

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const Services = () => {
  return (
    <section id="services" className="bg-[#131313] shadow-[0px_0px_65px_65px_#131313] relative py-20 w-full">

      <Title title="SERVICES" />

      <motion.div
        className="grid md:grid-cols-2 gap-10 xl:px-60 lg:px-32 px-5 mt-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <motion.div key={index} variants={cardVariants}>
              <Card
                className="group min-h-52 bg-gradient-to-br from-[#1c1c1c] to-[#111111] border border-red-600 hover:border-red-400 transition-all duration-500 text-white shadow-md hover:shadow-red-500/30"
              >
                <CardHeader className="flex justify-start items-center gap-3   space-y-4">
                  <div className="bg-red-600 p-3 rounded-full group-hover:bg-red-500 transition-colors duration-300">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-semibold group-hover:text-red-500 transition-colors duration-300 mb-4">
                    {service.name}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-400  px-4">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Services;
