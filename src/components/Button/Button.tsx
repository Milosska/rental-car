import css from './Button.module.css';

interface IButtonLinkProps {
  text: string;
  onClick: () => void;
  type?: 'button' | 'submit';
  width?: number;
  colored?: boolean;
}

const Button = ({
  text,
  onClick,
  type = 'button',
  width = 244,
  colored = false,
}: IButtonLinkProps) => {
  return (
    <button
      onClick={onClick}
      className={`${css.button} ${colored ? css.button_link_colored : ''}`}
      style={{ width }}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
