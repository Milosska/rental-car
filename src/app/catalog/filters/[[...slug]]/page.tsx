import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import CatalogPageClient from './CatalogPageClient';
import { carFetchOptions } from '@/lib/api/carsQueries';

const CatalogPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.infiniteQuery(carFetchOptions);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CatalogPageClient />
    </HydrationBoundary>
  );
};

export default CatalogPage;
