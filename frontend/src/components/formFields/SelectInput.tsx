type SelectProps = {
  id: string;
  name: string;
  selectValue: string | number | undefined;
  options: {
    text: string;
    value: string | number | readonly string[] | undefined;
    disabled?: boolean;
  }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function SelectInput({
  options,
  name,
  id,
  onChange,
  selectValue,
}: SelectProps) {
  return (
    <select name={name} id={id} value={selectValue} onChange={onChange}>
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
