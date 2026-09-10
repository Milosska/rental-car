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
  const params = await searchParams;

  const queryClient = new QueryClient();
  await queryClient.infiniteQuery(carFetchOptions(params));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogPageClient />
    </HydrationBoundary>
  );
};

export default CatalogPage;
