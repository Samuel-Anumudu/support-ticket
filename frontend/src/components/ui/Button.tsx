type ButtonProps = {
  type?: "reset" | "button" | "submit";
  text: string;
  className: string;
  children?: React.ReactNode;
  onClick?: () => any;
};

function Button({ type, text, className, onClick, children }: ButtonProps) {
  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
      {text}
    </button>
  );
}

export default Button;
