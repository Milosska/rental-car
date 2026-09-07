'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import css from './Header.module.css';

const Header = () => {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" aria-label="Home">
          <Image src="/logo.svg" alt="Logo" width={120} height={26} />
        </Link>
        <nav aria-label="Main Navigation">
          <ul className={css.nav_list}>
            <li>
              <Link
                href="/"
                className={`${css.nav_link} ${pathname === '/' ? css.active : ''}`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/catalog"
                className={`${css.nav_link} ${pathname === '/catalog' ? css.active : ''}`}
              >
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
