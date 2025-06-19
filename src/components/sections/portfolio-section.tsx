
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const portfolioItems = [
  {
    title: 'Done my Best',
    category: 'Web Development',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'website interface',
    link: '#',
  },
  {
    title: 'Working',
    category: 'Mobile App',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'mobile app',
    link: '#',
  },
  {
    title: 'SaaS Dashboard UI',
    category: 'UI/UX',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'dashboard analytics',
    link: '#',
  },
];

export function PortfolioSection() {
  return (
    <section id="portfolio" className="py-16 md:py-24 bg-primary/5">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Our Creative Showcase
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Take a glimpse at some of the stunning projects built using Charan UI Kit components.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {portfolioItems.map((item) => (
            <Card key={item.title} className="overflow-hidden bg-card shadow-lg hover:shadow-xl transition-shadow duration-300 group">
              <div className="relative h-60 w-full">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill={true}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={item.dataAiHint}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
              </div>
              <CardContent className="p-6">
                <p className="text-sm font-medium text-accent mb-1">{item.category}</p>
                <h3 className="font-headline text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <Button variant="outline" asChild className="border-primary/50 text-primary-foreground hover:bg-primary/10 hover:text-accent">
                  <Link href={item.link}>
                    View Project <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Button size="lg" variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/portfolio">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

