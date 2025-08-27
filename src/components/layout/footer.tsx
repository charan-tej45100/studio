import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="container mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-10 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} <span style={{ color: '#39FF14' }} className="underline decoration-white">Charan</span>. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          <Link href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-muted-foreground transition-colors hover:text-accent-foreground">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
          </Link>
          <Link href="https://instagram.com/chrn_tej" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg
              fill="currentColor"
              viewBox="0 0 24 24"
              className="h-5 w-5 text-muted-foreground transition-colors hover:text-accent-foreground"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919C8.416 2.175 8.796 2.163 12 2.163m0-2.163C8.74 0 8.333.011 7.053.069 2.59.215.215 2.59.069 7.053.011 8.333 0 8.74 0 12s.011 3.667.069 4.947c.146 4.46 2.522 6.836 6.984 6.984 1.28.058 1.687.069 4.947.069s3.667-.011 4.947-.069c4.46- A.148 6.836-2.522 6.984-6.984.058-1.28.069-1.687.069-4.947s-.011-3.667-.069-4.947C21.41.215 19.035 0 14.947 0C13.667.011 13.26 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"></path>
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
