"use client";

import * as React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Title from "@/components/Shared/Title";
import { DotLottiePlayer } from "@dotlottie/react-player";
import { Calendar, Clock, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useProjects } from "@/Tanstack/Project/useProjects";
import { IProject } from "@/app/api/_models/ProjectModel";


const OnGoing = () => {

    const { data: projectData } = useProjects({ status: "pending" });

    const data: IProject = projectData?.projects[0] || {}

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const formatDate = (dateStr: string | undefined) => {
        if (!dateStr) return "";
        const [year, month, day] = dateStr.split("-");
        return {
            day,
            month: months[parseInt(month) - 1],
            year,
        };
    };

    const startDate = formatDate(data?.startDate);
    const endDate = formatDate(data?.deadline);

    const calculateProgress = () => {
        if (!data?.startDate || !data?.deadline) return 0;
        const start = new Date(data.startDate);
        const end = new Date(data.deadline);
        const today = new Date();
        if (today < start) return 0;
        if (today > end) return 100;
        const totalDays =
            (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
        const daysElapsed =
            (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
        return Math.round((daysElapsed / totalDays) * 100);
    };

    const progress = calculateProgress();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3
            }
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
            },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.85 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    };





    return (
        <section
            id="on-going"
            className="bg-[#0c0a09] shadow-[0px_0px_65px_65px_#0c0a09] relative w-full py-16"

        >

            <Title
                eyebrow="work in progress"
                title="ONGOING PROJECT"
                highlight="PROJECT"
                description="Follow my progress on the latest project I'm working on"
            />

            {data?.visible ? (
                <motion.div

                    className="container mx-auto px-4 mt-12"
                    variants={containerVariants}
                    animate={true}
                >


                    <Card className="bg-black/40 backdrop-blur-md border-gray-800 overflow-hidden h-full p-0">
                        <CardContent className="p-0 h-full">
                            <div className="grid md:grid-cols-5 gap-0 h-full">
                                {/* Image Section */}
                                <motion.div
                                    className="md:col-span-2 h-full relative group overflow-hidden"
                                    variants={imageVariants}
                                >
                                    <div className="relative w-full h-full">
                                        <Image
                                            src={data.imgDisplayURL!}
                                            alt={data.title}
                                            fill
                                            className="object-cover transition-transform duration-1000 ease-linear group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, 40vw"
                                            priority
                                        />

                                        {/* Preview Button: Opens an external link (e.g., GitHub repo) */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4 cursor-pointer">
                                            <a
                                                href={data.gitHubURL} // Replace with your repo URL
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <Badge
                                                    variant="outline"
                                                    className="bg-black/50 text-xs font-normal border-red-500/20 text-white"
                                                >
                                                    <ExternalLink className="h-3 w-3 mr-1" />
                                                    Preview Project
                                                </Badge>
                                            </a>
                                        </div>
                                    </div>
                                </motion.div>




                                {/* Details Section */}
                                <motion.div
                                    className="md:col-span-3 p-10 flex flex-col"
                                    variants={itemVariants}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <Badge className="bg-red-600/20 text-red-400 hover:bg-red-600/30 border-none text-xs">
                                            {
                                                data.category
                                                    .toLowerCase()
                                                    .split('-')
                                                    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                    .join(' ')
                                            }
                                        </Badge>
                                        <div className="flex items-center text-xs text-gray-400">
                                            <Clock className="h-3 w-3 mr-1" />
                                            <span>{progress}% Complete</span>
                                        </div>
                                    </div>

                                    <h2 className="text-xl font-medium text-white mb-2">{data.title}</h2>

                                    <Progress
                                        className="h-1.5 bg-gray-800"
                                        barClassName="bg-red-500"
                                        value={progress}
                                    />

                                    <p className="text-gray-400 text-sm mt-4 mb-6 line-clamp-3">
                                        {data.description}
                                    </p>

                                    <div className="mt-auto grid grid-cols-2 gap-4">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2 mb-1 text-xs text-gray-400">
                                                <Calendar className="h-3 w-3 text-red-500" />
                                                <span>Start Date</span>
                                            </div>
                                            <div className="bg-gray-900/50 rounded p-2 text-center">
                                                <div className="text-lg font-medium text-white">
                                                    {typeof startDate === "object" ? startDate.day : ""}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {typeof startDate === "object"
                                                        ? `${startDate.month}, ${startDate.year}`
                                                        : ""}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2 mb-1 text-xs text-gray-400">
                                                <Calendar className="h-3 w-3 text-red-500" />
                                                <span>Deadline</span>
                                            </div>
                                            <div className="bg-gray-900/50 rounded p-2 text-center">
                                                <div className="text-lg font-medium text-white">
                                                    {typeof endDate === "object" ? endDate.day : ""}
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {typeof endDate === "object"
                                                        ? `${endDate.month}, ${endDate.year}`
                                                        : ""}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {
                                            data?.techStacks?.map((tech) => {
                                                return (
                                                    <Badge key={tech} variant="outline" className="text-xs bg-transparent border-gray-700 text-gray-400">{tech}</Badge>
                                                )
                                            })
                                        }
                                    </div>
                                </motion.div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center gap-6 mt-12 px-4"
                >
                    <h1 className="text-xl text-red-500 font-medium">No Ongoing Project!</h1>
                    <div className="max-w-xs">
                        <DotLottiePlayer
                            src="https://lottie.host/1d4b606d-504e-4c60-9ea1-1171190bef32/gJ27BUO4zN.json"
                            autoplay
                            loop
                        />
                    </div>
                </motion.div>
            )}
        </section>
    );
};

export default OnGoing;
