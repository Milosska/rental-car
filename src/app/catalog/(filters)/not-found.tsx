import type { Metadata } from 'next';
import { WEBSITE_BASE_URL } from '@/lib/metadata';
import NotFoundImage from '@/assets/images/not-found.png';

import CarNotFound from '@/components/CarNotFound';
import css from './not_found.module.css';

const baseMetadataValues = {
  title: 'Rental Car — Page Not Found',
  description:
    'The page you are looking for could not be found. Return to RentalCar to find the perfect car for your needs.',
};

export const metadata: Metadata = {
  ...baseMetadataValues,
  openGraph: {
    ...baseMetadataValues,
    url: `${WEBSITE_BASE_URL}/}`,
    siteName: 'Rental Car',
    images: [
      {
        url: NotFoundImage.src,
        width: 1200,
        height: 630,
        alt: 'Rental Car — Page Not Found',
      },
    ],
    type: 'website',
  },
  twitter: {
    ...baseMetadataValues,
    card: 'summary_large_image',
    images: [
      {
        url: NotFoundImage.src,
        width: 1200,
        height: 630,
        alt: 'Rental Car — Page Not Found',
      },
    ],
  },
};

const NotFound = () => {
  return (
    <div className={css.container}>
      <CarNotFound />
    </div>
  );
};

export default NotFound;
