
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { HomeIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-center">
      <h1 className="font-headline text-9xl font-extrabold tracking-tight animate-blink" style={{ color: '#39FF14' }}>
        404
      </h1>
      <p className="mt-4 text-2xl font-medium text-foreground">
        Oops! Page Not Found
      </p>
      <p className="mt-2 text-lg text-muted-foreground">
        Building
      </p>
      <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
        <Link href="/">
          <HomeIcon className="mr-2 h-5 w-5" />
          Go to Homepage
        </Link>
      </Button>
    </div>
  );
}

