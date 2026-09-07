import Link from 'next/link';
import css from './ButtonLink.module.css';

interface IButtonLinkProps {
  href: string;
  text: string;
  width?: number;
}

const ButtonLink = ({ href, text, width = 244 }: IButtonLinkProps) => {
  return (
    <Link href={href} className={css.button_link} style={{ width }}>
      {text}
    </Link>
  );
};

export default ButtonLink;
