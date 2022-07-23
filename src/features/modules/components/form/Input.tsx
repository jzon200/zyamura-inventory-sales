import { HTMLAttributes, HTMLInputTypeAttribute, useState } from "react";
import { FieldError, Path, UseFormRegister } from "react-hook-form";

type Props = {
  id?: string;
  label?: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  defaultValue?: string | number;
  maxLength?: number;
  autoFocus?: boolean;
  className?: string;
  accept?: string;
  inputValue: Path<InputValues>;
  required?: boolean;
  valueAsNumber?: boolean;
  error?: FieldError;
  register: UseFormRegister<InputValues>;
};

export default function Input({
  id,
  type,
  inputValue,
  autoFocus,
  className,
  label,
  defaultValue,
  placeholder,
  maxLength = 50,
  required,
  valueAsNumber,
  accept,
  error,
  register,
}: Props) {
  const [isTouched, setIsTouched] = useState(false);

  return (
    <div>
      <label
        aria-activedescendant=""
        className={`${error && "text-red-500"} ${
          !error && isTouched && "text-blue-500"
        }`}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={`${
          error && "border-red-500 focus:border-red-500 focus:ring-red-500"
        } form-control ${className}`}
        id={id}
        type={type}
        placeholder={placeholder}
        min={1}
        step={"any"}
        accept={accept}
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        onKeyDown={(event) => {
          // if the input type is number, this will disable this keys
          const disabledKeys = type === "number" ? ["e", "E", "+", "-"] : [];
          // Only disable decimal in Quantity Input
          if (inputValue === "quantity") disabledKeys.push(".");
          disabledKeys.includes(event.key) && event.preventDefault();
        }}
        onFocus={() => setIsTouched(true)}
        {...register(inputValue, {
          required: {
            value: required ? required : false,
            message: "This field is required.",
          },
          maxLength: {
            value: maxLength,
            message: `Max length exceeded: ${maxLength}`,
          },
          valueAsNumber,
          onBlur() {
            setIsTouched(false);
          },
        })}
      />
      {/* {error?.type === "maxLength" && (
        <p className="text-red-400">{error.message}</p>
      )} */}
      {/* {error?.type === "required" && (
        <p className="absolute top-16 text-red-500 mb-0">{error.message}</p>
      )} */}
    </div>
  );
}
