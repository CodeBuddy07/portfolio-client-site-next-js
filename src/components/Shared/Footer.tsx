import {
    Instagram,
    Github,
    Linkedin,
    Facebook,
  } from 'lucide-react';
  
  const socialLinks = [
    {
      name: 'Instagram',
      link: 'https://www.instagram.com/anony_mirage/',
      Icon: Instagram,
    },
    {
      name: 'GitHub',
      link: 'https://github.com/CodeBuddy07',
      Icon: Github,
    },
    // {
    //   name: 'Upwork',
    //   link: 'https://www.upwork.com/freelancers/~01acdd751f607d3f6f',
    //   Icon: Upwork,
    // },
    {
      name: 'LinkedIn',
      link: 'https://www.linkedin.com/in/ruhul-amin-b39a69249/',
      Icon: Linkedin,
    },
    {
      name: 'Facebook',
      link: 'https://www.facebook.com/RuhulAmin0101',
      Icon: Facebook,
    },
  ];
  
  const Footer = () => {
    return (
      <footer className="w-full bg-stone-950 text-gray-400 py-5 px-6 md:px-20 flex flex-col md:flex-row justify-between items-center gap-5 shadow-[0_0_80px_20px_#131313]">
        <p className="text-sm text-center md:text-left">
          © 2024 - Ruhul by Codever
        </p>
  
        <div className="flex gap-4">
          {socialLinks.map(({ name, link, Icon }) => (
            <a
              key={name}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              className="p-2 rounded-full bg-white/10 hover:bg-red-600 transition-colors duration-300 text-white hover:text-black "
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </footer>
    );
  };
  
  export default Footer;
  