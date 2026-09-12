'use client';
import { useEffect } from 'react';
import { Oval } from 'react-loader-spinner';
import css from './Loader.module.css';

interface ILoaderProps {
  header: string;
  text: string;
}

const Loader = ({ header, text }: ILoaderProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className={css.backdrop}>
      <div role="status" aria-label="Loading" className={css.thumb}>
        <Oval
          height={72}
          width={72}
          color="#00aad4"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="oval-loading"
          secondaryColor="#f7f7f7"
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
        <h2 className={css.header}>{header}</h2>
        <h2 className={css.subheader}>{text}</h2>
      </div>
    </div>
  );
};

export default Loader;
