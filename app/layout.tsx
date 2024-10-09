import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../components/theme-provider';
import { TooltipProvider } from '../components/ui/tooltip';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Interactive World Map',
  description: 'Explore countries and their information with an interactive world map',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.3/d3.min.js" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/topojson/1.6.9/topojson.min.js" />
        <Script src="https://datamaps.github.io/scripts/datamaps.world.min.js" />
      </head>
      <body className={`${inter.className} bg-gray-900`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}