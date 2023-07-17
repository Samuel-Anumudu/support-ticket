type TextInputProps = {
  type: string;
  id: string;
  name: string;
  value: string;
  placeholder: string;
  required?: boolean;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
function TextInput({
  type,
  id,
  name,
  value,
  placeholder,
  required,
  className,
  onChange,
}: TextInputProps) {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      className={className}
    />
  );
}

export default TextInput;
