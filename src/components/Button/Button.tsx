import css from './Button.module.css';

interface IButtonLinkProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  width?: number;
  colored?: boolean;
  styles?: React.CSSProperties;
  disabled?: boolean;
}

const Button = ({
  text,
  onClick,
  type = 'button',
  width,
  colored = false,
  disabled = false,
  styles,
}: IButtonLinkProps) => {
  return (
    <button
      onClick={onClick}
      className={`${css.button} ${colored ? css.button_colored : ''}`}
      style={{ width, ...styles }}
      type={type}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
