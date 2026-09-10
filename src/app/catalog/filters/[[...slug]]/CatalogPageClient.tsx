'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { carFetchOptions } from '@/lib/api/carsQueries';

import Button from '@/components/Button';

const CatalogPageClient = () => {
  const {
    // data,
    fetchNextPage,
    hasNextPage,
    // isError, error
  } = useInfiniteQuery(carFetchOptions);
  // console.log(isError, error);
  // console.log(
  //   'cars',
  //   data?.pages.flatMap(pageData => pageData.cars)
  // );
  return (
    <div>
      {hasNextPage && <Button text="Load More" onClick={fetchNextPage} />}
    </div>
  );
};

export default CatalogPageClient;
