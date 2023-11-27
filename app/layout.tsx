import '@/styles/globals.css';
import '@/styles/pico.min.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exámenes 5ºA',
  description:
    'Verifica los exámenes que tienes que hacer y no te olvides de ninguno',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
  },
  manifest: '/manifest.json',
  apple: {
    appleTouchIcon: '/icon-512x512.png',
  },
  themeColor: '#fff',
  icons: {
    shortcut: '/icon-512x512.png',
  },
  og: {
    type: 'website',
    siteName: 'Exámenes 5ºA',
  },
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
    images: [
      {
        url: 'https://examenes-5to.vercel.app/icon-512x512.png',
      },
    ],
  },
};
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='es'>
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
