
"use client";

import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText } from 'lucide-react';
import Link from 'next/link';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 flex h-full w-full items-center justify-center bg-background/50"><p>Loading 3D scene...</p></div>,
});

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background to-primary/10 py-20 md:py-32 h-[500px] md:h-[600px] lg:h-[700px]">
      <Spline
        scene="https://prod.spline.design/fP0LH65i8bXQDQjZ/scene.splinecode"
        className="absolute inset-0 h-full w-full"
      />
      <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center">
        <h1
          className="relative inline-block font-headline text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          style={{
            color: '#FFFFFF'
          }}
        >
          Charan
          <span
            className="absolute bottom-[0.02em] left-0 h-[0.06em] w-full animate-blink"
            style={{ backgroundColor: '#39FF14' }}
            aria-hidden="true"
          ></span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl md:text-2xl">
          Exploring new edges of the <span className="font-sreda font-bold text-[#39FF14] underline decoration-white">WORLD</span>
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="w-full shadow-lg transform transition-transform hover:scale-105 sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="#features">
              Explore <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="w-full shadow-lg transform transition-transform hover:scale-105 sm:w-auto border-primary/50 text-primary-foreground hover:bg-primary/10 hover:text-accent">
            <Link href="/docs">
              Read Docs <FileText className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
