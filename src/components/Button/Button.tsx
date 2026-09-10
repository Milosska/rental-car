import css from './Button.module.css';

interface IButtonLinkProps {
  text: string;
  onClick: () => void;
  type?: 'button' | 'submit';
  width?: number;
  colored?: boolean;
  styles?: React.CSSProperties;
}

const Button = ({
  text,
  onClick,
  type = 'button',
  width = 244,
  colored = false,
  styles,
}: IButtonLinkProps) => {
  return (
    <button
      onClick={onClick}
      className={`${css.button} ${colored ? css.button_link_colored : ''}`}
      style={{ width, ...styles }}
      type={type}
    >
      {text}
    </button>
  );
};

export default Button;
