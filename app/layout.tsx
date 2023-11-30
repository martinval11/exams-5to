import '@/styles/globals.css';
import '@/styles/pico.min.css';
import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Exámenes 5ºA',
  description:
    'Verifica los exámenes que tienes que hacer y no te olvides de ninguno',
  manifest: '/manifest.json',
  icons: {
    shortcut: '/icon-512x512.png',
    apple: '/icon-512x512.png',
  },
  metadataBase: new URL('https://examenes-5to.vercel.app/'),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: 'https://examenes-5to.vercel.app',
  },
  openGraph: {
    title: 'Exámenes 5ºA',
    siteName: 'Exámenes 5ºA',
    description:
      'Verifica los exámenes que tienes que hacer y no te olvides de ninguno',
    url: 'https://examenes-5to.vercel.app',
    images: [
      {
        url: 'https://examenes-5to.vercel.app/icon-512x512.png',
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#fff',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='es'>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
