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
