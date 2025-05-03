'use client'
import { useSocialLinks } from '@/Tanstack/SocialLinks/useSocialLinks';
import {
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Mail
} from "lucide-react";
import Image from 'next/image';



const Footer = () => {

  interface SocialLink {
    _id: string;
    platform: string;
    url: string;
  }

  const { data: socialLinks } = useSocialLinks();

  // Map icon names to Lucide components
  const icons = {
    github: <Github  size={18} />,
    linkedin: <Linkedin  size={18} />,
    twitter: <Twitter  size={18} />,
    instagram: <Instagram  size={18} />,
    facebook: <Facebook  size={18} />,
    youtube: <Youtube  size={18} />,
    mail: <Mail  size={18} />
  };

  const getIconComponent = (iconName: keyof typeof icons) => {
    const iconKey = iconName.toLowerCase() as keyof typeof icons;
    return icons[iconKey] || <Github />;
  };


  return (
    <footer className="w-full bg-stone-950 text-gray-400 py-5 px-6 md:px-20 flex flex-col md:flex-row justify-between items-center gap-5 shadow-[0_0_80px_20px_#131313]">
      <p className="text-sm text-center md:text-left">
        <span>
          <Image
            src="/logo_white.png"
            alt="Logo"
            width={20}
            height={20}
            priority
            className="inline-block mr-2"
          />
        </span>
        © 2024 - Ruhul by Codever
      </p>

      <div className="flex gap-4">
        {socialLinks?.map((link: SocialLink) => (
          <a
            key={link._id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.platform}
            className="p-2 rounded-full bg-white/10 hover:bg-red-600 transition-colors duration-300 text-white hover:text-black "
          >
            {getIconComponent(link.platform as keyof typeof icons)}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
