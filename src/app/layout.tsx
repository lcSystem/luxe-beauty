import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AURA ATELIER | Portafolio Editorial de Nail Art & Haute Beauté',
  description: 'Mostrario visual contemporáneo de arte en uñas, manicure ruso y belleza integral de alta precisión. Una experiencia editorial inmersiva.',
  keywords: [
    'nail art de autor',
    'manicure ruso',
    'uñas esculpidas',
    'editorial nails',
    'beauty portfolio',
    'alta manicura',
    'pedicure spa',
    'laminado de cejas',
  ],
  authors: [{ name: 'Aura Atelier Haute Beauté' }],
  creator: 'Aura Atelier',
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://aura-atelier.vercel.app',
    siteName: 'AURA ATELIER · Visual Portfolio',
    title: 'AURA ATELIER — Mostrario de Alta Manicura & Belleza',
    description: 'Una colección visual para descubrir. Arte en uñas, precisión rusa y estética contemporánea sin artificios.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=90',
        width: 1200,
        height: 800,
        alt: 'AURA ATELIER Haute Beauté & Nail Artistry',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AURA ATELIER — Portafolio Editorial de Uñas & Belleza',
    description: 'Explora nuestra galería visual de trabajos realizados con precisión escultórica.',
    images: ['https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1200&q=90'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#FAF8F5',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="bg-atelier-ivory text-atelier-noir antialiased selection:bg-atelier-nude selection:text-atelier-noir">
        {children}
      </body>
    </html>
  );
}
