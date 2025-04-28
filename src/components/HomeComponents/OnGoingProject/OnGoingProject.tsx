"use client";

import Title from "@/components/Shared/Title";
import { DotLottiePlayer } from "@dotlottie/react-player";


import { motion } from "framer-motion";
import Image from "next/image";

const OnGoing = () => {
    const data = {
        "_id": "65bf295a8a8f308c18f6e889",
        "placeholder": "onGoing",
        "category": "MERN",
        "deadline": "2024-11-22",
        "description": "Developed a file upload and sharing system where users receive custom domain URLs for their files, redirecting seamlessly to Google Drive. Utilized React for the frontend, Node.js and Express.js for the backend, and the Google Drive API for storage. This project enhances file-sharing with branded, user-friendly URLs.",
        "imgDeleteURL": "https://ibb.co/RNwQPW5/293d2999878bd85affd1e3e32952d2fa",
        "imgDisplayURL": "https://i.ibb.co/dtYk6yh/screencapture-barauthenup-digitelunionsoft-2024-10-21-22-44-36.png",
        "name": "File Uploading Sytem",
        "starDate": "2024-10-20",
        "visible": false
    };

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const formatDate = (dateStr: string | undefined) => {
        if (!dateStr) return "";
        const [year, month, day] = dateStr.split("-");
        return {
            day,
            month: months[parseInt(month) - 1],
            year
        };
    };

    const startDate = formatDate(data?.starDate);
    const endDate = formatDate(data?.deadline);

    return (
        <section id="on-going" className="bg-[#131313] shadow-[0px_0px_65px_65px_#131313] relative w-full py-20">
            <Title title="ON GOING" />

            {data?.visible ? (
                <div className="xl:px-80 lg:px-32 px-5 mt-20 flex flex-col items-center">
                    <div className="flex flex-wrap justify-center gap-10 w-full">
                        {/* Image Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="rounded-lg overflow-hidden shadow-md hover:shadow-red-600 bg-gradient-to-br from-[#1c1c1c] to-[#111] w-64 h-64 relative group"
                        >
                            <div className="w-full h-3 backdrop-blur-md bg-gray-200/30 flex gap-1 items-center px-2">
                                <div className="w-1 h-1 bg-white rounded-full"></div>
                                <div className="w-1 h-1 bg-white rounded-full"></div>
                                <div className="w-1 h-1 bg-white rounded-full"></div>
                            </div>
                            <div className="relative w-full h-[15.5rem] overflow-hidden">
                                <Image
                                    src={data?.imgDisplayURL || "/placeholder.png"} // fallback in case `imgDisplayURL` is missing
                                    alt="Ongoing Project"
                                    fill // fill the parent div
                                    className="object-cover transform transition-transform duration-1000 ease-linear group-hover:-translate-y-[calc(100%-16rem)]"
                                    sizes="(max-width: 768px) 100vw, 400px" // Responsive
                                    priority // Faster loading for important images
                                />
                            </div>
                        </motion.div>

                        {/* Text Details */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="max-w-md flex flex-col justify-center text-white"
                        >
                            <h2 className="text-lg font-semibold">Title: <span className="font-medium">{data?.name}</span></h2>
                            <p className="text-gray-400 text-sm mt-5">{data?.description}</p>
                        </motion.div>

                        {/* Dates */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7 }}
                            className="flex gap-8 flex-wrap justify-center items-center"
                        >
                            {/* Start Date */}
                            <div className="text-center">
                                <h3 className="font-bold text-lg text-red-600 mb-2">Start Date</h3>
                                <div className="bg-white/10 backdrop-blur-md px-5 py-6 rounded-lg border-t-4 border-red-600">
                                    <h1 className="text-3xl font-bold text-white">{typeof startDate === "object" ? startDate.day : ""}</h1>
                                    <p className="text-gray-400 text-xs">{typeof startDate === "object" ? `${startDate.month}, ${startDate.year}` : ""}</p>
                                </div>
                            </div>

                            {/* Deadline */}
                            <div className="text-center">
                                <h3 className="font-bold text-lg text-red-600 mb-2">Deadline</h3>
                                <div className="bg-white/10 backdrop-blur-md px-5 py-6 rounded-lg border-t-4 border-red-600">
                                    <h1 className="text-3xl font-bold text-white">{typeof endDate === "object" ? endDate.day : ""}</h1>
                                    <p className="text-gray-400 text-xs">{typeof endDate === "object" ? `${endDate.month}, ${endDate.year}` : ""}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center gap-8 mt-20 px-5"
                >
                    <h1 className="text-2xl text-red-600 ">No Ongoing Project!</h1>
                    <div className="max-w-sm">
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
