import Link from 'next/link';
import css from './ButtonLink.module.css';

interface IButtonLinkProps {
  href: string;
  text: string;
  width?: number;
  colored?: boolean;
}

const ButtonLink = ({
  href,
  text,
  width = 244,
  colored = false,
}: IButtonLinkProps) => {
  return (
    <Link
      href={href}
      className={`${css.button_link} ${colored ? css.button_link_colored : ''}`}
      style={{ width }}
    >
      {text}
    </Link>
  );
};

export default ButtonLink;
