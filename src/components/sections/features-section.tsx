import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Layers, Palette, Smartphone, Zap } from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: <Layers className="h-10 w-10 text-accent mb-4" />,
    title: 'Rich Component Library',
    description: 'Access a wide variety of pre-built components, from buttons to complex data tables, all designed with accessibility and responsiveness in mind.',
    link: '/components',
  },
  {
    icon: <Palette className="h-10 w-10 text-accent mb-4" />,
    title: 'Easy Theme Customization',
    description: 'Effortlessly adapt the look and feel to match your brand with our intuitive theming system. Switch between light and dark modes seamlessly.',
    link: '/theming',
  },
  {
    icon: <Smartphone className="h-10 w-10 text-accent mb-4" />,
    title: 'Fully Responsive Design',
    description: 'All components are designed to look great on any device, ensuring a consistent user experience across desktops, tablets, and mobiles.',
    link: '/responsive',
  },
  {
    icon: <Zap className="h-10 w-10 text-accent mb-4" />,
    title: 'Developer Friendly',
    description: 'Built with Next.js and Tailwind CSS, our UI kit is optimized for performance and offers a smooth development experience.',
    link: '/getting-started',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything You Need in One Place
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            New Project
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="flex flex-col bg-card/50 border-border/50 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <CardHeader className="items-center text-center">
                {feature.icon}
                <CardTitle className="font-headline text-xl text-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow text-center">
                <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
              </CardContent>
              <div className="p-6 pt-0 text-center">
                 <Link href={feature.link} className="text-sm font-medium text-accent hover:text-accent/80 transition-colors">
                    Learn More &rarr;
                 </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
