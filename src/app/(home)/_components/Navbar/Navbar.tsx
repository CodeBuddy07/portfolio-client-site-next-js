'use client'

import { useState, useEffect, MouseEvent } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Link from 'next/link'
import Image from 'next/image'
import { DialogTitle } from '@/components/ui/dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Track scroll position for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* Main Navbar */}
      <nav className={`
        fixed w-full z-50 transition-all duration-300 border-none text-white flex justify-center items-center 
        ${isScrolled ? 'bg-black/40 backdrop-blur-sm shadow-sm py-2' : 'bg-transparent py-4'}
        border-b
      `}>
        <div className="container flex justify-between items-center px-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              <div className='flex flex-col items-center gap-2'>
                <Image
                  src="/logo_white.png"
                  alt="Logo"
                  width={30}
                  height={30}
                  priority
                />
                <p className='text-xs tracking-widest font-light text-slate-300'>DEVELOPER</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink href="#header">Home</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <Button asChild variant="ghost">
              <NavLink href="#contact">Contact</NavLink>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen} >
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px] p-5 backdrop-blur-md bg-stone-950/80 border-none" // 🧠 Added blur and semi-white
              >
                <DialogTitle>
                  <VisuallyHidden>Mobile Navigation Menu</VisuallyHidden> {/* Hidden title for screen readers */}
                </DialogTitle>

                <div className="flex flex-col gap-6 pt-6">
                  <MobileNavLink href="#header" onClick={() => setIsMenuOpen(false)}>Home</MobileNavLink>
                  <MobileNavLink href="#about" onClick={() => setIsMenuOpen(false)}>About</MobileNavLink>
                  <MobileNavLink href="#projects" onClick={() => setIsMenuOpen(false)}>Projects</MobileNavLink>
                  <MobileNavLink href="#skills" onClick={() => setIsMenuOpen(false)}>Skills</MobileNavLink>
                  <Button asChild variant="outline" className="w-full border-red-600 text-red-600 hover:text-white hover:bg-red-700 transition-colors">
                    <MobileNavLink href="#contact" onClick={() => setIsMenuOpen(false)}>Contact</MobileNavLink>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </nav>
    </>
  )
}

// Reusable NavLink component for desktop
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="text-sm font-medium tracking-wider transition-colors hover:text-red-600"
    >
      {children}
    </a>
  );
}

// Reusable NavLink component for mobile
function MobileNavLink({
  href,
  children,
  onClick,
}: {
  href: string
  children: React.ReactNode
  onClick?: () => void
}) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }

    if (onClick) onClick();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className="text-sm font-medium tracking-wider transition-colors text-white hover:text-red-600 "
    >
      {children}
    </a>
  )
}