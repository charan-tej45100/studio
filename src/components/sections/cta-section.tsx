
"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Mail } from 'lucide-react';
import { FormEvent } from 'react';

export function CTASection() {
  const { toast } = useToast();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;

    if (email) {
      // Simulate API call
      console.log('Email submitted:', email);
      toast({
        title: "Subscribed!",
        description: "Thanks for subscribing. We'll be in touch shortly.",
        variant: "default",
      });
      (event.target as HTMLFormElement).reset();
    } else {
      toast({
        title: "Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
    }
  };

  return (
    <section id="subscribe" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <Mail className="h-16 w-16 text-accent mx-auto mb-6" />
        <h2 className="font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Stay <span style={{ color: '#39FF14' }} className="underline decoration-white">Updated</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Join our mailing list to receive updates on new components, features, and exclusive tips for building amazing user interfaces.
        </p>
        <form onSubmit={handleSubmit} className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <div className="relative w-full max-w-md">
            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="email"
              name="email"
              placeholder="Enter your email address"
              aria-label="Email address"
              required
              className="h-12 pl-10 pr-4 text-base"
            />
          </div>
          <Button type="submit" size="lg" className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90">
            Subscribe Now
          </Button>
        </form>
        <p className="mt-6 text-sm text-muted-foreground">
          We respect your privacy. No spam, unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
