type TextInputProps = {
  type: string;
  id: string;
  name: string;
  textValue: string;
  placeholder: string;
  required?: boolean;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
function TextInput({
  type,
  id,
  name,
  textValue,
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
      value={textValue}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      className={className}
    />
  );
}

export default TextInput;
