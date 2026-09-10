import { infiniteQueryOptions } from '@tanstack/react-query';
import { fetchCars, INITIAL_PAGE } from '@/lib/api/cars';
import type { CarSearchParams } from '@/lib/types/cars';

export const carFetchOptions = (params?: CarSearchParams) => {
  return infiniteQueryOptions({
    queryKey: ['cars', params],
    queryFn: ({ pageParam }) =>
      fetchCars({ page: pageParam, searchParams: params }),
    initialPageParam: INITIAL_PAGE,
    getNextPageParam: lastPage =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });
};
