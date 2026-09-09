import css from './Button.module.css';

interface IButtonLinkProps {
  text: string;
  onClick: () => void;
  width?: number;
  colored?: boolean;
}

const ButtonLink = ({
  text,
  onClick,
  width = 244,
  colored = false,
}: IButtonLinkProps) => {
  return (
    <button
      onClick={onClick}
      className={`${css.button} ${colored ? css.button_link_colored : ''}`}
      style={{ width }}
    >
      {text}
    </button>
  );
};

export default ButtonLink;
