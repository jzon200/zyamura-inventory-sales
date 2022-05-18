import { useState } from "react";
import { UseFormRegister } from "react-hook-form";

type Props = {
  items: string[];
  id: string;
  label: string;
  register: UseFormRegister<InputValues>;
};

// const items: Category[] = ["fish", "dog", "materials", "other"];

const SelectMenu = ({ items, id, label, register }: Props) => {
  const [isTouched, setIsTouched] = useState(false);
  return (
    <div className="flex flex-col gap-[1px]">
      <label className={`${isTouched && "text-blue-500"}`} htmlFor={id}>
        {label}
      </label>
      <select
        id={id}
        className="form-control px-2"
        onFocus={() => setIsTouched(true)}
        {...register("category", {
          onBlur() {
            setIsTouched(false);
          },
        })}
      >
        {items.map((item, index) => (
          <option key={index} value={item}>{`${item
            .charAt(0)
            .toUpperCase()}${item.slice(1)}`}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectMenu;
