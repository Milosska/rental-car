import CarNotFound from '@/components/CarNotFound';
import css from './not_found.module.css';

const NotFound = () => {
  return (
    <div className={css.container}>
      <CarNotFound />
    </div>
  );
};

export default NotFound;
