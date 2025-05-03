"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Github, Clock } from "lucide-react";
import Image from "next/image";
import { useProjects } from "@/Tanstack/Project/useProjects";
import { IProject } from "@/app/api/_models/ProjectModel";
import { ProjectDetailDialog } from "./_components/ProjectDetailDialog";





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

export const calculateDuration = (startDate: string, deadline: string): string => {
    const start = new Date(startDate);
    const end = new Date(deadline);
    const durationInMilliseconds = end.getTime() - start.getTime();

    const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24);
    if (durationInDays < 7) {
        return `${Math.round(durationInDays)} Day${Math.round(durationInDays) > 1 ? 's' : ''}`;
    }

    const durationInWeeks = durationInDays / 7;
    if (durationInWeeks < 4) {
        return `${Math.round(durationInWeeks)} Week${Math.round(durationInWeeks) > 1 ? 's' : ''}`;
    }

    const durationInMonths = durationInDays / 30;
    return `${Math.round(durationInMonths)} Month${Math.round(durationInMonths) > 1 ? 's' : ''}`;
};


const Projects = () => {

    const [activeCategory, setActiveCategory] = useState("ALL");

    const { data: projectData } = useProjects({ category: activeCategory === "ALL" ? undefined : activeCategory });

    const projects = projectData?.projects || [];
    // Get unique categories
    const categories: string[] = ["ALL", ...Array.from(new Set(projects.map((p: IProject) => p.category))) as string[]];

    const [selectedProject, setSelectedProject] = useState<null | IProject>(null);

    const containerRef = useRef<HTMLDivElement>(null);



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
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2 text-sm rounded-full transition-all duration-300 ${activeCategory === category
                                ? "bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg shadow-red-500/20"
                                : " text-gray-400 hover:text-white bg-stone-900 hover:bg-gray-800"
                                }`}
                        >
                            {category
                                .toLowerCase()
                                .split('-')
                                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(' ')
                            }
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
                        {projects.map((project: IProject) => (
                            <motion.div
                                key={project._id}
                                className="snap-center flex-shrink-0"
                                custom={project._id}
                                initial="hidden"
                                animate="visible"
                                variants={projectAnimation}
                            >
                                <Card className="w-80 h-[450px] bg-black/40 backdrop-blur-sm border border-gray-700 hover:border-red-500 overflow-hidden rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10 group">
                                    <div className="relative h-48 overflow-hidden">
                                        <Image
                                            src={project.imgDisplayURL!}
                                            alt={project.title}
                                            width={500}
                                            height={200}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            style={{ objectFit: 'cover' }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
                                            <Badge className="bg-red-500 text-white hover:bg-red-600">
                                                {
                                                    project.category
                                                        .toLowerCase()
                                                        .split('-')
                                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                        .join(' ')
                                                }
                                            </Badge>
                                            <div className="flex items-center gap-1 text-gray-300 text-sm">
                                                <Clock size={14} />
                                                <span>{calculateDuration(project.startDate, project.deadline)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <CardContent className="p-5">
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                                            {project.title}
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
                                                    href={project.liveURL}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-gray-400 hover:text-white transition-colors"
                                                >
                                                    <ExternalLink size={18} />
                                                </a>
                                                <a
                                                    href={project.gitHubURL}
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
            <ProjectDetailDialog
                isOpen={!!selectedProject}
                onOpenChange={() => setSelectedProject(null)}
                selectedProject={selectedProject}
            />

        </section>
    );
};

export default Projects;