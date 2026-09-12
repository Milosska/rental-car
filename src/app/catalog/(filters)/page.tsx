import type { Metadata } from 'next';
import { WEBSITE_BASE_URL, baseMetadataImg } from '@/lib/metadata';

import { notFound } from 'next/navigation';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import CatalogPageClient from './CatalogPageClient';
import { carFetchOptions } from '@/lib/api/carsQueries';
import type { CarSearchParams } from '@/lib/types/cars';
interface ICatalogPage {
  searchParams?: Promise<CarSearchParams>;
}

export async function generateMetadata({
  searchParams,
}: ICatalogPage): Promise<Metadata> {
  const searchParamsObject = await searchParams;

  const baseMetadataValues = {
    title: `Rental Car — Car Catalog`,
    description:
      'Browse our available rental cars, filter vehicles by your preferences, and find the right car for your trip.',
  };

  return {
    ...baseMetadataValues,
    openGraph: {
      ...baseMetadataValues,
      url: `${WEBSITE_BASE_URL}/catalog/${searchParamsObject}`,
      siteName: 'Rental Car',
      images: [baseMetadataImg],
      type: 'article',
    },
    twitter: {
      ...baseMetadataValues,
      card: 'summary_large_image',
      images: [baseMetadataImg],
    },
  };
}

const CatalogPage = async ({ searchParams }: ICatalogPage) => {
  const searchParamsObject = await searchParams;

  const queryClient = new QueryClient();
  const results = await queryClient.infiniteQuery(
    carFetchOptions(searchParamsObject)
  );

  const cars = results && results.pages.flatMap(pageData => pageData.cars);

  if (!cars || cars.length === 0) {
    notFound();
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogPageClient />
    </HydrationBoundary>
  );
};

export default CatalogPage;
