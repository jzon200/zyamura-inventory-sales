import { FC, useState } from "react";
import { Path, UseFormRegister } from "react-hook-form";

// type Props = {
//   label: string;
//   id?: string;
//   type?: string;
//   placeholder?: string;
//   defaultValue?: string | number;
//   required?: boolean;
//   autoFocus?: boolean;
//   className?: string;
//   register: UseFormRegister<IFormValues>;
// };

// interface IFormValues {
//   "Item Name": string;
//   Age: number;
// }

type InputProps = {
  id?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string | number;
  autoFocus?: boolean;
  className?: string;
  accept?: string;
  inputValue: Path<InputValues>;
  required?: boolean;
  valueAsNumber?: boolean;
  register: UseFormRegister<InputValues>;
};

const Input: FC<InputProps> = (props) => {
  const [isTouched, setIsTouched] = useState(false);

  const {
    id,
    type,
    inputValue,
    register,
    autoFocus,
    className,
    label,
    defaultValue,
    placeholder,
    required,
    valueAsNumber,
    accept,
  } = props;

  return (
    <div>
      <label className={`${isTouched && "text-blue-500"}`} htmlFor={id}>
        {label}
      </label>
      <input
        className={`form-control ${className}`}
        id={id}
        type={type}
        placeholder={placeholder}
        min={0}
        step={"any"}
        accept={accept}
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        onFocus={() => setIsTouched(true)}
        {...register(inputValue, {
          required,
          valueAsNumber,
          onBlur() {
            setIsTouched(false);
          },
        })}
      />
    </div>
  );
};

export default Input;
