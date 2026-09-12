import type { Metadata } from 'next';
import { WEBSITE_BASE_URL, baseMetadataImg } from '@/lib/metadata';

import { Manrope } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

import TanStackProvider from '@/components/TanStackProvider';
import Header from '@/components/Header/';

import 'modern-normalize';
import './globals.css';

const baseMetadataValues = {
  title: 'Rental Car — Find Your Perfect Car',
  description:
    'Find and rent the perfect car for your next trip. Browse available vehicles and choose the one that fits your needs.',
};

export const metadata: Metadata = {
  ...baseMetadataValues,
  openGraph: {
    ...baseMetadataValues,
    url: `${WEBSITE_BASE_URL}/`,
    siteName: 'RentalCar',
    images: [baseMetadataImg],
    type: 'website',
  },
  twitter: {
    ...baseMetadataValues,
    card: 'summary_large_image',
    images: [baseMetadataImg],
  },
};

const manropeFont = Manrope({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" className={`${manropeFont.variable}`}>
      <body>
        <Header />
        <TanStackProvider>
          <main>{children}</main>
        </TanStackProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              iconTheme: {
                primary: '#00aad4',
                secondary: '#ffffff',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
