"use client";

import { useState, useEffect } from 'react';
import { DotLottiePlayer } from "@dotlottie/react-player";
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram,
  Facebook,
  Youtube,
  Mail
} from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const StickySideBar = () => {
  interface SocialLink {
    name: string;
    link: string;
    icon: string;
  }
  
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);

  useEffect(() => {
    // In Next.js, we would typically fetch this data server-side
    // This is a fallback for client-side rendering
    const fetchData = async () => {
      try {
        // Replace this with your actual data fetching logic
        // For example, using Next.js API routes:
        // const res = await fetch('/api/social-links');
        // const data = await res.json();
        
        // Example mock data
        const mockData = [
          { name: "GitHub", link: "https://github.com", icon: "github" },
          { name: "LinkedIn", link: "https://linkedin.com", icon: "linkedin" },
          { name: "Twitter", link: "https://twitter.com", icon: "twitter" },
          { name: "Instagram", link: "https://instagram.com", icon: "instagram" },
          { name: "Email", link: "mailto:contact@example.com", icon: "mail" }
        ];
        
        setSocialLinks(mockData);
      } catch (error) {
        console.error("Failed to fetch social links:", error);
      }
    };

    fetchData();
  }, []);

  // Map icon names to Lucide components
  const icons = {
    github: <Github color='red' size={18} />,
    linkedin: <Linkedin color='red' size={18} />,
    twitter: <Twitter color='red' size={18} />,
    instagram: <Instagram color='red' size={18} />,
    facebook: <Facebook color='red' size={18} />,
    youtube: <Youtube color='red' size={18} />,
    mail: <Mail color='red' size={18} />
  };

  const getIconComponent = (iconName: keyof typeof icons) => {
      const iconKey = iconName.toLowerCase() as keyof typeof icons;
      return icons[iconKey] || <Github />;
  };

  return (
    <TooltipProvider>
      <div className="hidden lg:flex justify-center items-center fixed left-6 top-1/2 -translate-y-1/2 flex-col gap-6 z-30">
        
        
        <div className="flex flex-col gap-4">
          {socialLinks.map((link, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.2 }}
              className="transition-all"
            >
              <Tooltip>
                <TooltipTrigger asChild>
                <a 
                    href={link.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-8 h-8 rounded-full  backdrop-blur-sm text-white hover:text-red-200 hover:bg-red-800 hover:shadow-md hover:shadow-red-900/40 transition-colors"
                    aria-label={link.name}
                  >
                    {getIconComponent(link.icon as keyof typeof icons)}
                  </a>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>{link.name}</p>
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