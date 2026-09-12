import Link from 'next/link';
import css from './ButtonLink.module.css';

interface IButtonLinkProps {
  href: string;
  text: string;
  width?: number;
  colored?: boolean;
  target?: '_blank' | '_self';
  ariaLabel?: string;
}

const ButtonLink = ({
  href,
  text,
  width,
  colored = false,
  target = '_self',
  ariaLabel,
}: IButtonLinkProps) => {
  return (
    <Link
      href={href}
      className={`${css.button_link} ${colored ? css.button_link_colored : ''}`}
      style={{ width }}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      aria-label={ariaLabel}
    >
      {text}
    </Link>
  );
};

export default ButtonLink;
