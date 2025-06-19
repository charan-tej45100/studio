"use client";

import Spline from '@splinetool/react-spline';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-background to-primary/10 overflow-hidden">
      <Spline
        scene="https://prod.spline.design/QLD-o6Ytqgf9Y2W2/scene.splinecode"
        className="absolute inset-0 w-full h-full"
      />
      <div className="container mx-auto max-w-4xl px-4 text-center relative z-10">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
          Charan
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground sm:text-xl md:text-2xl">
          Charan UI Kit provides a comprehensive suite of beautifully designed, highly customizable, and production-ready components for your Next.js applications.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg transform transition-transform hover:scale-105">
            <Link href="#features">
              Explore Components <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full sm:w-auto border-primary/50 text-primary-foreground hover:bg-primary/10 hover:text-accent shadow-lg transform transition-transform hover:scale-105">
            <Link href="/docs">
              Read Docs <FileText className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
