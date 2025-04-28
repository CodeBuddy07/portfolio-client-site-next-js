"use client";

import Title from "@/components/Shared/Title";
import { Button } from "@/components/ui/button";
import { ArrowBigDownDash } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const About = () => {
  const data = {
    _id: "65b7abb3ed5527627f4f6fa2",
    placeholder: "about",
    about: "Hey there! I'm Ruhul Amin, a passionate web developer with a knack for crafting immersive and user-friendly digital experiences. My journey into the world of programming began with a deep dive into technologies like React, Node.js, and JavaScript.\n\nI have expertise in HTML and CSS. My toolbox includes Tailwind CSS and Bootstrap for responsive and visually appealing designs.\n\nSpecializing in MERN (MongoDB, Express.js, React, Node.js) stack development, I seamlessly integrate front-end and back-end technologies to deliver robust and scalable solutions. My proficiency extends to database management with MongoDB, ensuring data is not just stored but optimized for efficient retrieval.\n\nLet's collaborate and turn your ideas into reality! Whether you're looking to enhance user experiences, streamline workflows, or create a dynamic web presence, I'm here to bring your vision to life.",
    resumeURL: "https://docs.google.com/document/d/1HNn6EsjwJ9kXSgB8iMhfaqcZCl_4LB9BKt8KY7L5zB4/edit?usp=sharing",
    selfImgDisplayURL: "/ProfileImage.jpg"
  };

  return (
    <div
      id="about"
      className="bg-[#131313] shadow-[0px_0px_105px_105px_#131313] relative z-10 w-full py-20"
    >
      <Title title={"ABOUT"} />

      <div className="xl:px-80 lg:px-32 flex justify-center items-center gap-5 px-5 mt-12">
        <div className="flex flex-col lg:flex-row justify-center gap-5 items-center">

          {/* Profile Image */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 10 }}
            className="w-80 lg:w-96 h-96 bg-red-600 overflow-hidden rounded-t-full rounded-b-full"
          >
            <Image
              src={data.selfImgDisplayURL}
              alt="Ruhul Amin Profile Image"
              width={500}
              height={900}
              className="w-80 lg:w-96 -mb-10 object-cover"
            />
          </motion.div>

          {/* About Text and Action Buttons */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="2xl:w-full xl:w-[700px] lg:w-[500px] w-full"
          >
            <p className="text-gray-400 mb-5 whitespace-pre-line">
              {data?.about}
            </p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-col lg:flex-row gap-4 mt-5"
            >
              <Button className="bg-red-500 hover:bg-red-600">
                Contact Me
              </Button>

              <Button
                variant={"outline"}
                className="bg-transparent text-white hover:border-red-600 hover:bg-red-600 ml-4"
                onClick={() => window.open(data.resumeURL, "_blank")}
              >
                <ArrowBigDownDash fill="red" />
                Download CV
              </Button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default About;
