
import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Charan UI Kit',
  description: 'Interactive UI elements inspired by modern design.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-body antialiased min-h-screen flex flex-col bg-background text-foreground cursor-none`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
