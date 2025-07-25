/**
 * Root layout component
 * Provides global layout structure with header and authentication context
 */
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Noorish - Building America\'s Smartest Blocks',
  description: 'Autonomous drone services, community tech workshops, and innovative products for the neighborhoods of tomorrow. Serving Chicago suburbs with smart community solutions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
