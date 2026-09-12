import type { Metadata } from 'next';
import { WEBSITE_BASE_URL } from '@/lib/metadata';

import Image from 'next/image';
import NotFoundImage from '@/assets/images/not-found.png';

import ButtonLink from '@/components/ButtonLink';
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
    url: `${WEBSITE_BASE_URL}/`,
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
      <Image
        src={NotFoundImage}
        alt="Page not found"
        width={414}
        height={388}
        priority
        className={css.image}
      />
      <h2 className={css.header}>Page Not Found</h2>
      <p className={css.subheader}>
        We couldn’t find the page you’re looking for. Please check the URL and
        try again.
      </p>
      <ButtonLink href="/" text="Go Home" width={156} />
    </div>
  );
};

export default NotFound;
