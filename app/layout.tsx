import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import SessionProviderWrapper from './SessionProviderWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Incredible India | Discover the Heritage, Wildlife, and Wonders',
  description: 'Recreate the official Incredible India tourism portal. Explore luxury tours, destinations, packages, events, itineraries, and plan your magical trip to India.',
  openGraph: {
    title: 'Incredible India | Luxury Tourism Portal',
    description: 'Discover the rich heritage, wildlife, spirituality, and adventure of India. Explore packages and plan your dream trip.',
    images: [{ url: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&h=630&q=80' }],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-navy text-white min-h-screen flex flex-col`}>
        <SessionProviderWrapper>
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
