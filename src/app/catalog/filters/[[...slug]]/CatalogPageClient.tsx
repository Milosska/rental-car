'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { carFetchOptions } from '@/lib/api/carsQueries';

import CarCard from '@/components/CarCard';
import Button from '@/components/Button';

import css from './CatalogPageClient.module.css';

const CatalogPageClient = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    // isError, error
  } = useInfiniteQuery(carFetchOptions);

  const cars = data && data.pages.flatMap(pageData => pageData.cars);
  // console.log(isError, error);

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
        />
      )}
    </div>
  );
};

export default CatalogPageClient;
