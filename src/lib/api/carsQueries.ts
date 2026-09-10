import { infiniteQueryOptions } from '@tanstack/react-query';
import { fetchCars, INITIAL_PAGE } from '@/lib/api/cars';

export const carFetchOptions = infiniteQueryOptions({
  queryKey: ['cars'],
  queryFn: ({ pageParam }) => fetchCars({ page: pageParam }),
  initialPageParam: INITIAL_PAGE,
  getNextPageParam: lastPage =>
    lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
});
