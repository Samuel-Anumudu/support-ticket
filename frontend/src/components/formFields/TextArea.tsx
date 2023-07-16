type TextAreaProps = {
  id: string;
  name: string;
  textAreaValue: string | undefined;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

function TextArea({
  name,
  id,
  onChange,
  textAreaValue,
  placeholder,
}: TextAreaProps) {
  return (
    <textarea
      name={name}
      id={id}
      value={textAreaValue}
      placeholder={placeholder}
      onChange={onChange}
    ></textarea>
  );
}

export default TextArea;
