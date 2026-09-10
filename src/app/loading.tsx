import css from './loading.module.css';
import Loader from '@/components/Loader';

const Loading = () => {
  return (
    <div className={css.backdrop}>
      <Loader
        header="Loading..."
        text="Please wait while we fetch the required data for you"
      />
    </div>
  );
};

export default Loading;
