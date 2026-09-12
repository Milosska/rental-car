'use client';
import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { carFetchOptions } from '@/lib/api/carsQueries';
import toast from 'react-hot-toast';

import CarCard from '@/components/CarCard';
import Button from '@/components/Button';
import Loader from '@/components/Loader';
import CarNotFound from '@/components/CarNotFound';

import type { CarSearchParams } from '@/lib/types/cars';
import css from './CatalogPageClient.module.css';

const CatalogPageClient = () => {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams) as CarSearchParams;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetching,
    isFetchingNextPage,
    isError,
    error,
  } = useInfiniteQuery(carFetchOptions(params));

  const cars = data && data.pages.flatMap(pageData => pageData.cars);
  const isCarsFound = cars && cars.length > 0;
  const isPageLoading = isLoading || isFetching || isFetchingNextPage;
  const isEmpty = !isLoading && !isFetching && !isCarsFound;

  useEffect(() => {
    if (isError && error) {
      toast.error(error.message);
    }
  }, [isError, error]);

  return (
    <div className={css.container}>
      {isCarsFound && (
        <ul className={css.car_list}>
          {cars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </ul>
      )}
      {isEmpty && <CarNotFound />}
      {hasNextPage && (
        <Button
          text="Load More"
          onClick={fetchNextPage}
          styles={{ margin: '46px auto 0' }}
          disabled={isFetchingNextPage}
          width={156}
        />
      )}
      {isPageLoading && (
        <Loader
          header="Loading cars..."
          text="Please wait while we fetch the best cars for you"
        />
      )}
    </div>
  );
};

export default CatalogPageClient;
