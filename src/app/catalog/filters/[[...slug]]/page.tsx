import { notFound, redirect } from 'next/navigation';
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import CatalogPageClient from './CatalogPageClient';
import { carFetchOptions } from '@/lib/api/carsQueries';
import type { CarSearchParams } from '@/lib/types/cars';
interface ICatalogPage {
  params: Promise<{ slug: string[] }>;
  searchParams?: Promise<CarSearchParams>;
}

const CatalogPage = async ({ searchParams, params }: ICatalogPage) => {
  const searchParamsObject = await searchParams;
  const { slug } = await params;

  // A workaround to navigate to the same page from local 404
  if (slug && slug[0] === 'reset') {
    redirect('/catalog/filters');
  }

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
