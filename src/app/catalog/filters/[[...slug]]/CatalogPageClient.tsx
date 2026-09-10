'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { carFetchOptions } from '@/lib/api/carsQueries';
import toast from 'react-hot-toast';

import CarCard from '@/components/CarCard';
import Button from '@/components/Button';
import Loader from '@/components/Loader';

import css from './CatalogPageClient.module.css';

const CatalogPageClient = () => {
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams);

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

  if (isError && error) {
    toast.error(error.message);
  }

  return (
    <div className={css.container}>
      {cars && (
        <ul className={css.car_list}>
          {cars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </ul>
      )}
      {hasNextPage && (
        <Button
          text="Load More"
          onClick={fetchNextPage}
          styles={{ margin: '46px auto 0' }}
          disabled={isFetchingNextPage}
        />
      )}
      {(isLoading || isFetching || isFetchingNextPage) && (
        <Loader
          header="Loading cars..."
          text="Please wait while we fetch the best cars for you"
        />
      )}
    </div>
  );
};

export default CatalogPageClient;
