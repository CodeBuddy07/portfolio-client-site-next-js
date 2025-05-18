"use client";

import { DotLottiePlayer } from "@dotlottie/react-player";
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram,
  Facebook,
  Youtube,
  Mail,
  Earth
} from "lucide-react";
import { TbBrandLeetcode } from "react-icons/tb";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useSocialLinks } from '@/Tanstack/SocialLinks/useSocialLinks';

const StickySideBar = () => {
  interface SocialLink {
    _id: string;
    platform: string;
    url: string;
  }
  
  const  { data: socialLinks } = useSocialLinks();

  // Map icon names to Lucide components
  const icons = {
    github: <Github color='red' size={18} />,
    linkedin: <Linkedin color='red' size={18} />,
    twitter: <Twitter color='red' size={18} />,
    instagram: <Instagram color='red' size={18} />,
    facebook: <Facebook color='red' size={18} />,
    youtube: <Youtube color='red' size={18} />,
    mail: <Mail color='red' size={18} />,
    leetcode: <TbBrandLeetcode color='red' size={18} />
  };

  const getIconComponent = (iconName: keyof typeof icons) => {
      const iconKey = iconName.toLowerCase() as keyof typeof icons;
      return icons[iconKey] || <Earth color='red' size={18} />;
  };

  return (
    <TooltipProvider>
      <div className="hidden lg:flex justify-center items-center fixed left-6 top-1/2 -translate-y-1/2 flex-col gap-6 z-30">
        
        
        <div className="flex flex-col gap-4">
          {socialLinks?.map((link:SocialLink ) => (
            <motion.div
              key={link._id}
              whileHover={{ scale: 1.2 }}
              className="transition-all"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-8 h-8 rounded-full  backdrop-blur-sm text-white hover:text-red-200 hover:bg-red-800 hover:shadow-md hover:shadow-red-900/40 transition-colors"
                    aria-label={link.platform}
                  >
                    {getIconComponent(link.platform as keyof typeof icons)}
                  </a>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{link.platform}</p>
                </TooltipContent>
              </Tooltip>
            </motion.div>
          ))}
        </div>

        <div className="w-12 h-12 mb-2">
          <DotLottiePlayer 
            src="https://lottie.host/9f73d1dc-1cfe-466a-8ea8-89cf7ff0e9da/02fczPM2M5.json" 
            autoplay 
            loop 
          />
        </div>
      </div>
    </TooltipProvider>
  );
};

export default StickySideBar;