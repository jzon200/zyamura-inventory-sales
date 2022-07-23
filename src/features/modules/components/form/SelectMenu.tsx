import { useState } from "react";
import { Path, UseFormRegister } from "react-hook-form";

type Props = {
  items: string[];
  id: string;
  label: string;
  defaultValue?: string;
  inputValue: Path<InputValues>;
  register: UseFormRegister<InputValues>;
};

export default function SelectMenu({
  items,
  id,
  label,
  defaultValue,
  inputValue,
  register,
}: Props) {
  const [isTouched, setIsTouched] = useState(false);

  return (
    <div className="flex flex-col gap-[1px]">
      <label className={`${isTouched && "text-blue-500"}`} htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="form-control px-2"
        defaultValue={!defaultValue ? "" : defaultValue}
        onFocus={() => setIsTouched(true)}
        {...register(inputValue, {
          onBlur() {
            setIsTouched(false);
          },
        })}
      >
        <option disabled hidden value={""}>
          Select {id}
        </option>
        {items.map((item, index) => (
          <option key={index} value={item}>{`${item
            .charAt(0)
            .toUpperCase()}${item.slice(1)}`}</option>
        ))}
      </select>
    </div>
  );
}
