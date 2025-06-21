
"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/hooks/use-toast";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <ToastProvider>
                {children}
                <Toaster />
            </ToastProvider>
        </ThemeProvider>
    );
}
