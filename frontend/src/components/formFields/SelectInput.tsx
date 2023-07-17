type SelectInputProps = {
  id: string;
  name: string;
  value: string | number | undefined;
  options: {
    text: string;
    value: string | number | readonly string[] | undefined;
    disabled?: boolean;
  }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function SelectInput({ options, name, id, onChange, value }: SelectInputProps) {
  return (
    <select name={name} id={id} value={value} onChange={onChange}>
      {options.map((option) => (
        <option
          key={option.text}
          value={option.value}
          disabled={option.disabled}
        >
          {option.text}
        </option>
      ))}
    </select>
  );
}

export default SelectInput;
