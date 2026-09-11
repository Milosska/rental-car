import Image from 'next/image';
import NotFoundImage from '@/assets/images/not-found.png';
import ButtonLink from '@/components/ButtonLink';
import css from './CarNotFound.module.css';

const CarNotFound = () => {
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
      <ButtonLink
        href="/catalog/filters/reset"
        text="Reset filters"
        width={156}
      />
    </>
  );
};

export default CarNotFound;
