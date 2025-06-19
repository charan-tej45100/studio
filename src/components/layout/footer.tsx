import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} <span style={{ color: '#39FF14' }}>Charan</span>. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <Link href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-muted-foreground transition-colors hover:text-accent-foreground">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
          </Link>
          <Link href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github className="h-5 w-5 text-muted-foreground transition-colors hover:text-accent-foreground" />
          </Link>
          <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5 text-muted-foreground transition-colors hover:text-accent-foreground" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
