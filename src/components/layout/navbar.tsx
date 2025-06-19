
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
          aria-label="Durga Maa Home"
        >
          <svg width="auto" height="24" viewBox="0 0 224 42" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="logo-title-durga-maa">
            <title id="logo-title-durga-maa">Durga Maa Logo</title>
            <path d="M20.3753 0.719971L0.0419922 27.64V41.2H7.08074V30.16L23.4141 7.47997H24.0807L7.74736 30.16V41.2H14.7861V28.84L35.1194 1.91997V14.28L20.8753 33.4V41.2H27.9141V34L41.9141 15.48V0.719971H34.8753L20.3753 19.48L20.3753 0.719971Z" fill="#FCFCFC"></path>
            <path d="M62.0444 0.719971V41.2H84.4911C92.2911 41.2 97.7477 37.96 97.7477 30.64C97.7477 23.56 92.2911 20.08 84.4911 20.08H69.3311V0.719971H62.0444ZM83.8244 26.92C86.2911 26.92 87.5711 27.88 87.5711 30.4C87.5711 32.68 86.2911 33.88 83.8244 33.88H69.3311V26.92H83.8244Z" fill="#FCFCFC"></path>
            <path d="M122.044 0.719971V41.2H144.491C152.291 41.2 157.748 37.96 157.748 30.64C157.748 23.56 152.291 20.08 144.491 20.08H129.331V0.719971H122.044ZM143.824 26.92C146.291 26.92 147.571 27.88 147.571 30.4C147.571 32.68 146.291 33.88 143.824 33.88H129.331V26.92H143.824Z" fill="#FCFCFC"></path>
            <path d="M179.145 0.719971V7.47997H167.945V41.2H160.658V7.47997H149.458V0.719971H179.145Z" fill="#FCFCFC"></path>
            <path d="M185.245 0.719971H194.332L203.945 16.48L213.558 0.719971H222.645V41.2H215.358V11.56L206.045 27.88H201.845L192.532 11.56V41.2H185.245V0.719971Z" fill="#FCFCFC"></path>
          </svg>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggleButton />
          <Button asChild variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90">
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card shadow-lg">
          <nav className="flex flex-col space-y-4 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-accent-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild variant="default" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="#contact" onClick={() => setIsMenuOpen(false)}>Durga maa</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
