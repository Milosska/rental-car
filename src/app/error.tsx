'use client';
import Button from '@/components/Button';
import css from './error.module.css';

type IErrorPageProps = {
  error: Error;
  reset: () => void;
};

const ErrorPage = ({ error, reset }: IErrorPageProps) => {
  return (
    <div className={css.container}>
      <h2 className={css.header}>Something went wrong</h2>
      <p className={css.subheader}>
        We couldn’t load this page: {error.message}
        Please try again.
      </p>
      <Button text="Try Again" onClick={reset} />
    </div>
  );
};

export default ErrorPage;
