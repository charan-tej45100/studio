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
        <Link href="/" className="text-2xl font-bold text-primary-foreground transition-colors hover:text-accent">
          Charan UI
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
            <Link href="#contact">Get Started</Link>
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
              <Link href="#contact" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
