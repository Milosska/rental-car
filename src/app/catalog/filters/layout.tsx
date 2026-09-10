import css from './layout.module.css';

interface IFilteredCatalogLayout {
  filtermenu: React.ReactNode;
  children: React.ReactNode;
}

const FilteredCatalogLayout = ({
  filtermenu,
  children,
}: IFilteredCatalogLayout) => {
  return (
    <div className={css.container}>
      <nav aria-label="Car filters">{filtermenu}</nav>
      <section>{children}</section>
    </div>
  );
};

export default FilteredCatalogLayout;
