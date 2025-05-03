import { IProject } from "@/app/api/_models/ProjectModel";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Clock, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { calculateDuration } from "../Project";

type AddProjectDialogProps = {
    isOpen: boolean;
    onOpenChange: () => void;
    selectedProject: IProject | null
};

export function ProjectDetailDialog({ isOpen, onOpenChange, selectedProject }: AddProjectDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>


            <DialogContent className=" bg-stone-950 border border-stone-950 text-gray-200 max-w-4xl p-0 overflow-hidden rounded-xl">
                {selectedProject && (
                    <>
                        <div className="relative h-64 md:h-80 w-full overflow-hidden">
                            <Image
                                src={selectedProject.imgDisplayURL!}
                                alt={selectedProject.title}
                                width={1200}
                                height={600}
                                className="w-full h-full object-cover object-top"
                                style={{ objectFit: 'cover' }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>

                            <div className="absolute bottom-0 left-0 p-6">
                                <Badge className="mb-3 bg-red-500 text-white border-none">
                                    {
                                        selectedProject.category
                                            .toLowerCase()
                                            .split('-')
                                            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join(' ')
                                    }
                                </Badge>
                                <DialogTitle className="text-3xl font-bold text-white">
                                    {selectedProject.title}
                                </DialogTitle>
                            </div>
                        </div>

                        <div className="p-6">

                            <div className="flex flex-wrap gap-2 mb-3 -mt-4">
                                {
                                    selectedProject?.techStacks?.map((tech) => {
                                        return (
                                            <Badge key={tech} variant="outline" className="text-xs bg-transparent border-gray-700 text-gray-400">{tech}</Badge>
                                        )
                                    })
                                }
                            </div>

                            <div className="flex items-center gap-4 mb-6 text-sm">
                                <div className="flex items-center gap-1 text-gray-400">
                                    <Clock size={16} />
                                    <span>{calculateDuration(selectedProject.startDate, selectedProject.deadline)}</span>
                                </div>
                            </div>

                            <DialogDescription className="text-gray-300 mb-8 text-base">
                                {selectedProject.description}
                            </DialogDescription>

                            <div className="flex flex-wrap gap-4">
                                <a
                                    href={selectedProject.liveURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-md text-white font-medium hover:opacity-90 transition-opacity"
                                >
                                    <ExternalLink size={18} />
                                    View Live Site
                                </a>
                                <a
                                    href={selectedProject.gitHubURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-2 bg-gray-800 rounded-md text-white font-medium hover:bg-gray-700 transition-colors"
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
    )
}