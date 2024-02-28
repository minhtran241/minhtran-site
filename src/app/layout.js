import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import { Inter as FontSans } from 'next/font/google';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/themeProvider/theme-provider';
import { Toaster } from '@/components/ui/sonner';

export const fontSans = FontSans({
    subsets: ['latin'],
    variable: '--font-sans',
});

export const metadata = {
    title: {
        default: 'Minh Tran',
        template: '%s | Minh Tran',
    },
    description: 'Minh Tran personal website',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body
                className={cn(
                    'min-h-screen bg-background font-sans antialiased',
                    fontSans.variable
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <div className="sticky top-0 z-50">
                        <Navbar />
                    </div>
                    <div className="container dark:text-white">
                        {children}

                        <Toaster />
                    </div>
                    <div className="mt-20">
                        <Footer />
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
