import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchFilters } from '@/lib/api/cars';
import CarFiltersClient from './CarFiltersClient';

const FilterMenu = async () => {
  const queryClient = new QueryClient();

  await queryClient.query({
    queryKey: ['filters'],
    queryFn: () => fetchFilters(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CarFiltersClient />
    </HydrationBoundary>
  );
};

export default FilterMenu;
