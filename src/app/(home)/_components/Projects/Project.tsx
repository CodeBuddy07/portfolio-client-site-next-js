"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github, Clock } from "lucide-react";
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
        name: "Blood Map",
        description: "Platform connecting blood donors and seekers with real-time map search.",
        liveLink: "https://bloodmap.netlify.app/",
        repoLink: "https://github.com/CodeBuddy07/Blood-Map-Client-Site",
        category: "MERN",
        imgDisplayURL: "https://i.ibb.co/64xhVMB/Untitled-2.png",
        duration: "4",
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
        description: "Developed a file upload and sharing system where users receive custom domain URLs for their files, redirecting seamlessly to Google Drive. Utilized React for the frontend, Node.js and Express.js for the backend, and the Google Drive API for storage. This project enhances file-sharing with branded, user-friendly URLs.",
        liveLink: "https://ruhulcodes.netlify.app/",
        repoLink: "https://ruhulcodes.netlify.app/",
        category: "MERN",
        imgDisplayURL: "https://i.ibb.co/dtYk6yh/screencapture-barauthenup-digitelunionsoft-2024-10-21-22-44-36.png",
        duration: "2",
    }
];

// Get unique categories
const categories = ["ALL", ...new Set(projects.map((p) => p.category))];

const projectAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: "easeOut"
        }
    })
};


const Projects = () => {
    const [selectedProject, setSelectedProject] = useState<null | typeof projects[number]>(null);
    const [activeCategory, setActiveCategory] = useState("ALL");
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredProjects = activeCategory === "ALL"
        ? projects
        : projects.filter(p => p.category === activeCategory);

    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <section id="projects" className="bg-[#0c0a09] relative w-full py-24">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
                <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-red-500 filter blur-3xl"></div>
                <div className="absolute bottom-40 right-20 w-96 h-96 rounded-full bg-blue-500 filter blur-3xl"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Section header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500 inline-block mb-4">
                        Featured Projects
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-orange-500 mx-auto mb-6"></div>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Explore my latest work showcasing my technical skills and creative solutions
                    </p>
                </div>

                {/* Category filters */}
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 text-sm rounded-full transition-all duration-300 ${activeCategory === category
                                ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/20"
                                : " text-gray-400 hover:text-white bg-stone-900 hover:bg-gray-800"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Projects carousel */}
                <div className="relative">
                    <button
                        onClick={scrollLeft}
                        className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-gray-800/80 hover:bg-gray-700 text-white p-2 rounded-full shadow-lg hidden md:flex"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div
                        ref={containerRef}
                        className="flex gap-6 overflow-x-auto py-8 px-2 scrollbar-hide snap-x scroll-smooth"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={index}
                                className="snap-center flex-shrink-0"
                                custom={index}
                                initial="hidden"
                                animate="visible"
                                variants={projectAnimation}
                            >
                                <Card className="w-80 bg-black/40 backdrop-blur-sm border border-gray-700 hover:border-red-500 overflow-hidden rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 group">
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={project.imgDisplayURL}
                                            alt={project.name}
                                            width={500}
                                            height={200}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                                            <Badge className="bg-red-500 text-white hover:bg-red-600">
                                                {project.category}
                                            </Badge>
                                            <div className="flex items-center gap-1 text-gray-300 text-sm">
                                                <Clock size={14} />
                                                <span>{project.duration} weeks</span>
                                            </div>
                                        </div>
                                    </div>
                                    <CardContent className="p-5">
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                                            {project.name}
                                        </h3>
                                        <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                                            {project.description}
                                        </p>
                                        <div className="flex justify-between">
                                            <button
                                                onClick={() => setSelectedProject(project)}
                                                className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
                                            >
                                                View Details
                                            </button>
                                            <div className="flex gap-3">
                                                <a
                                                    href={project.liveLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-400 hover:text-white transition-colors"
                                                >
                                                    <ExternalLink size={18} />
                                                </a>
                                                <a
                                                    href={project.repoLink}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-400 hover:text-white transition-colors"
                                                >
                                                    <Github size={18} />
                                                </a>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <button
                        onClick={scrollRight}
                        className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-stone-900 hover:bg-gray-800 text-white p-2 rounded-full shadow-lg hidden md:flex"
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>

            {/* Detail Modal */}
            <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>


                <DialogContent className=" bg-stone-950 border border-stone-950 text-gray-200 max-w-4xl p-0 overflow-hidden rounded-xl">
                    {selectedProject && (
                        <>
                            <div className="relative h-64 md:h-80 w-full overflow-hidden">
                                <Image
                                    src={selectedProject.imgDisplayURL}
                                    alt={selectedProject.name}
                                    width={1200}
                                    height={600}
                                    className="w-full h-full object-cover object-top"
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

                                <div className="absolute bottom-0 left-0 p-6">
                                    <Badge className="mb-3 bg-red-500 text-white border-none">
                                        {selectedProject.category}
                                    </Badge>
                                    <DialogTitle className="text-3xl font-bold text-white">
                                        {selectedProject.name}
                                    </DialogTitle>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center gap-4 mb-6 text-sm">
                                    <div className="flex items-center gap-1 text-gray-400">
                                        <Clock size={16} />
                                        <span>{selectedProject.duration} weeks development</span>
                                    </div>
                                </div>

                                <DialogDescription className="text-gray-300 mb-8 text-base">
                                    {selectedProject.description}
                                </DialogDescription>

                                <div className="flex flex-wrap gap-4">
                                    <a
                                        href={selectedProject.liveLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                                    >
                                        <ExternalLink size={18} />
                                        View Live Site
                                    </a>
                                    <a
                                        href={selectedProject.repoLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-lg text-white font-medium hover:bg-gray-700 transition-colors"
                                    >
                                        <Github size={18} />
                                        View Source Code
                                    </a>
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