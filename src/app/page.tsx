import ButtonLink from '@/components/ButtonLink';

import css from './page.module.css';

export default function Home() {
  return (
    <section className={css.container}>
      <div className={css.thumb}>
        <h1 className={css.header}>Find your perfect rental car</h1>
        <p className={css.sub_header}>
          Reliable and budget-friendly rentals for any journey
        </p>
        <ButtonLink
          href="/catalog"
          text="View Catalog"
          width={276}
          colored
          ariaLabel="View vehicles catalog"
        />
      </div>
    </section>
  );
}
