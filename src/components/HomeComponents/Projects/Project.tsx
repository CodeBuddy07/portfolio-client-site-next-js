/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import Title from "@/components/Shared/Title";
import Image from "next/image";

const projects = [
    {
        name: "Fruit Brust",
        description: "I crafted a vibrant and user-friendly fruit-selling shop website...",
        liveLink: "https://codebuddy07.github.io/Assignment-3-Fruit-Brust/",
        repoLink: "https://github.com/CodeBuddy07/Assignment-3-Fruit-Brust",
        category: "REACT",
        imgDisplayURL: "https://i.ibb.co/RgWhwvW/screencapture-codebuddy07-github-io-Assignment-3-Fruit-Brust-2024-02-01-13-33-28.png",
        duration: "5",
    },
    {
        name: "Game Hub Website",
        description: "A dynamic gamer website built with HTML and CSS.",
        liveLink: "https://codebuddy07.github.io/Assignment-2-Gamer-Zone/",
        repoLink: "https://github.com/CodeBuddy07/Assignment-2-Gamer-Zone",
        category: "HTML/CSS",
        imgDisplayURL: "https://i.ibb.co/9nwF1CN/ongoing.png",
        duration: "3",
    },
    {
        name: "Blood Map",
        description: "Platform connecting blood donors and seekers with real-time map search.",
        liveLink: "https://bloodmap.netlify.app/",
        repoLink: "https://github.com/CodeBuddy07/Blood-Map-Client-Site",
        category: "MERN",
        imgDisplayURL: "https://i.ibb.co/64xhVMB/Untitled-2.png",
        duration: "4",
    },
    {
        name: "File Uploading System",
        description: "React + Node based system to generate custom domain file links via Google Drive.",
        liveLink: "https://ruhulcodes.netlify.app/",
        repoLink: "https://ruhulcodes.netlify.app/",
        category: "MERN",
        imgDisplayURL: "https://i.ibb.co/dtYk6yh/screencapture-barauthenup-digitelunionsoft-2024-10-21-22-44-36.png",
        duration: "2",
    }
];

// Get unique categories
const categories = ["ALL", ...new Set(projects.map((p) => p.category))];

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState<any>(null);

    return (
        <section id="projects" className="bg-[#131313] relative w-full py-20">
            <Title title="PROJECTS" />

            <div className="xl:px-60 lg:px-32 px-5 mt-20">
                <Tabs defaultValue="ALL" className="w-full">
                    <TabsList className="flex flex-wrap justify-center gap-2 mb-10 bg-transparent border-none">
                        {categories.map((category, idx) => (
                            <TabsTrigger key={idx} value={category} className="text-white data-[state=active]:bg-red-600 data-[state=active]:text-white rounded-full px-4 py-2 bg-gray-700 hover:bg-red-500 transition">
                                {category}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {categories.map((category) => {
                        const filteredProjects = category === "ALL" ? projects : projects.filter(p => p.category === category);

                        return (
                            <TabsContent key={category} value={category}>
                                <motion.div
                                    className="flex flex-wrap gap-6 justify-center"
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                >
                                    {filteredProjects.map((project, index) => (
                                        <motion.div key={index} variants={cardVariants}>
                                            <Card
                                                className="group bg-gradient-to-br from-[#1c1c1c] to-[#111111] border border-gray-700 hover:border-red-500 transition duration-500 w-64 overflow-hidden"
                                            >
                                                <CardHeader className="relative p-0">
                                                    <Image
                                                        src={project.imgDisplayURL}
                                                        alt={project.name}
                                                        width={500}
                                                        height={200}
                                                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                                                        style={{ width: '100%', height: '12rem', objectFit: 'cover' }}
                                                    />
                                                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition flex justify-center items-center">
                                                        <button
                                                            className="bg-red-600 px-4 py-1 rounded text-white text-sm hover:bg-red-500"
                                                            onClick={() => setSelectedProject(project)}
                                                        >
                                                            View Details
                                                        </button>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="p-4">
                                                    <CardTitle className="text-lg font-semibold text-white">{project.name}</CardTitle>
                                                    <p className="text-gray-400 text-xs mt-2">{project.category}</p>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </TabsContent>
                        );
                    })}
                </Tabs>
            </div>

            {/* Modal (Dialog) */}
            <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
                <DialogContent className="bg-[#1c1c1c] text-gray-200 max-w-3xl">
                    {selectedProject && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-2xl text-red-500">{selectedProject.name}</DialogTitle>
                                <DialogDescription className="text-sm mt-2">{selectedProject.category}</DialogDescription>
                            </DialogHeader>
                            <div className="flex flex-col md:flex-row gap-6 mt-4">
                                <Image
                                    src={selectedProject.imgDisplayURL}
                                    alt={selectedProject.name}
                                    width={800}
                                    height={600}
                                    className="w-full md:w-1/2 rounded-lg shadow-md"
                                    style={{ width: '100%', height: 'auto' }}
                                />
                                <div className="flex flex-col justify-between">
                                    <p className="text-sm">{selectedProject.description}</p>
                                    <div className="flex gap-4 mt-6">
                                        <a
                                            href={selectedProject.liveLink}
                                            target="_blank"
                                            className="btn btn-sm bg-gray-700 text-white hover:bg-gray-600 px-4 py-2 rounded"
                                            rel="noopener noreferrer"
                                        >
                                            Live Site
                                        </a>
                                        <a
                                            href={selectedProject.repoLink}
                                            target="_blank"
                                            className="btn btn-sm bg-gray-700 text-white hover:bg-gray-600 px-4 py-2 rounded"
                                            rel="noopener noreferrer"
                                        >
                                            GitHub
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default Projects;
