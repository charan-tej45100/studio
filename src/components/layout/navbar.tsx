
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { Menu, X } from 'lucide-react';
import React, { useState, useEffect } from 'react';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled ? 'bg-background/80 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-background"
          aria-label="Charan Home"
        >
          <svg width="auto" height="24" viewBox="0 0 190 45" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="logo-title-charan">
            <title id="logo-title-charan">Charan Logo</title>
            <path d="M20.3753 0.719971L0.0419922 27.64V41.2H7.08074V30.16L23.4141 7.47997H24.0807L7.74736 30.16V41.2H14.7861V28.84L35.1194 1.91997V14.28L20.8753 33.4V41.2H27.9141V34L41.9141 15.48V0.719971H34.8753L20.3753 19.48L20.3753 0.719971Z" fill="#FCFCFC"></path>
            <text x="50" y="35"
                  fontFamily="Inter, sans-serif" fontSize="30" fontWeight="bold" fill="#FCFCFC"
                  letterSpacing="1" dominantBaseline="alphabetic" textAnchor="start">
              CHARAN
            </text>
          </svg>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="inline-block transform text-sm font-medium text-muted-foreground transition-all duration-200 hover:scale-110 hover:text-[#39FF14]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggleButton />
          <Button asChild variant="default" className="bg-accent text-accent-foreground hover:bg-[#FF143C]">
            <Link href="#contact">Durga maa</Link>
          </Button>
        </div>

        <div className="md:hidden flex items-center">
          <ThemeToggleButton />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} className="ml-2">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-card shadow-lg">
          <nav className="flex flex-col space-y-4 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="inline-block transform text-sm font-medium text-muted-foreground transition-all duration-200 hover:scale-110 hover:text-[#39FF14]"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild variant="default" className="w-full bg-accent text-accent-foreground hover:bg-[#FF143C]">
              <Link href="#contact" onClick={() => setIsMenuOpen(false)}>Durga maa</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
