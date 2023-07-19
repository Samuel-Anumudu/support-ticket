type TextAreaProps = {
  id: string;
  name: string;
  value: string | undefined;
  placeholder?: string;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

function TextArea({
  name,
  id,
  onChange,
  value,
  placeholder,
  className,
}: TextAreaProps) {
  return (
    <textarea
      name={name}
      id={id}
      value={value}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
    ></textarea>
  );
}

export default TextArea;
