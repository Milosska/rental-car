'use client';
import Image from 'next/image';
import NotFoundImage from '@/assets/images/not-found.png';
import Button from '@/components/Button';
import css from './CarNotFound.module.css';

const CarNotFound = () => {
  // Hard navigation is required because soft navigation from not-found
  // keeps the stale not-found UI as the redirect happens inside same route
  const handleNavigate = () => {
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.href = '/catalog';
  };

  return (
    <>
      <Image
        src={NotFoundImage}
        alt="Page not found"
        width={414}
        height={388}
        priority
        className={css.image}
      />
      <h2 className={css.header}>No cars found</h2>
      <p className={css.subheader}>
        We couldn`t find any cars that match your current filters. Try changing
        your search criteria or reset the filters.
      </p>
      {/* <ButtonLink href="/catalog?reset=true" text="Reset filters" width={156} /> */}
      <Button onClick={handleNavigate} text="Reset filters" width={156} />
    </>
  );
};

export default CarNotFound;
