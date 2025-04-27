'use client'

import { useState, useEffect } from 'react'
import { Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import Link from 'next/link'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

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
        fixed w-full z-50 transition-all duration-300 border-none text-white 
        ${isScrolled ? 'bg-black/40 backdrop-blur-sm shadow-sm py-2' : 'bg-transparent  py-4'}
        border-b
      `}>
        <div className="container flex justify-between items-center px-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold">
              Portfolio
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#about">About</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#skills">Skills</NavLink>
            <Button asChild variant="ghost">
              <NavLink href="#contact">Contact</NavLink>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] p-5">
                <div className="flex flex-col gap-6 pt-6">
                  <MobileNavLink href="#home">Home</MobileNavLink>
                  <MobileNavLink href="#about">About</MobileNavLink>
                  <MobileNavLink href="#projects">Projects</MobileNavLink>
                  <MobileNavLink href="#skills">Skills</MobileNavLink>
                  <Button asChild variant="outline" className="w-full">
                    <MobileNavLink href="#contact">Contact</MobileNavLink>
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
  return (
    <a
      href={href}
      className="text-sm font-medium transition-colors hover:text-primary hover:underline underline-offset-4"
    >
      {children}
    </a>
  )
}

// Reusable NavLink component for mobile
function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="text-sm font-medium transition-colors hover:text-primary hover:underline underline-offset-4"
    >
      {children}
    </a>
  )
}