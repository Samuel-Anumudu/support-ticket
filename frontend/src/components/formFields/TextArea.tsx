type TextAreaProps = {
  id: string;
  name: string;
  value: string | undefined;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

function TextArea({ name, id, onChange, value, placeholder }: TextAreaProps) {
  return (
    <textarea
      name={name}
      id={id}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    ></textarea>
  );
}

export default TextArea;
