import Image from 'next/image';
import NotFoundImage from '@/assets/images/not-found.png';
import ButtonLink from '@/components/ButtonLink';
import css from './not_found.module.css';

const NotFound = () => {
  return (
    <div className={css.container}>
      <Image
        src={NotFoundImage}
        alt="Page not found"
        width={414}
        height={388}
        priority
        className={css.image}
      />
      <h2 className={css.header}>Page Not Found</h2>
      <p className={css.subheader}>
        We couldn’t find the page you’re looking for. Please check the URL and
        try again.
      </p>
      <ButtonLink href="/" text="Go Home" width={156} />
    </div>
  );
};

export default NotFound;
