import { useState } from "react";
import { Path, UseFormRegister } from "react-hook-form";

type InputProps = {
  id?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string | number;
  maxLength?: number;
  autoFocus?: boolean;
  className?: string;
  accept?: string;
  inputValue: Path<InputValues>;
  required?: boolean;
  disabled?: boolean;
  valueAsNumber?: boolean;
  register: UseFormRegister<InputValues>;
};

const Input = ({
  id,
  type,
  inputValue,
  register,
  autoFocus,
  className,
  label,
  defaultValue,
  placeholder,
  maxLength = 50,
  required,
  disabled,
  valueAsNumber,
  accept,
}: InputProps) => {
  const [isTouched, setIsTouched] = useState(false);

  return (
    <div>
      <label
        className={`${isTouched && "text-blue-500"} ${
          disabled && "text-gray-400"
        }`}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`form-control disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-400 ${className}`}
        id={id}
        type={type}
        placeholder={placeholder}
        min={1}
        maxLength={maxLength}
        step={"any"}
        accept={accept}
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        aria-disabled={disabled}
        disabled={disabled}
        onKeyDown={(event) => {
          // if the input type is number, this will disable this keys
          const disabledKeys = type === "number" ? ["e", "E", "+", "-"] : [];

          // Only disable decimal in Quantity Input
          if (inputValue === "quantity") disabledKeys.push(".");

          disabledKeys.includes(event.key) && event.preventDefault();
        }}
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
