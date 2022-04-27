import { ChangeEvent, FC, useState } from "react";
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
//   register: UseFormRegister<ProductDetails>;
// };

// interface IFormValues {
//   "Item Name": string;
//   Age: number;
// }

type InputProps = {
  id?: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string | number;
  autoFocus?: boolean;
  className?: string;
  label: Path<IFormValues>;
  register: UseFormRegister<IFormValues>;
  required?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

const Input: FC<InputProps> = (props) => {
  const [isTouched, setIsTouched] = useState(false);

  return (
    <div>
      <label className={`${isTouched && "text-blue-500"}`} htmlFor={props.id}>
        {props.label}
      </label>
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        required={props.required}
        autoFocus={props.autoFocus}
        min={1}
        onFocus={() => setIsTouched(true)}
        className={`form-control ${props.className}`}
        {...props.register(props.label, {
          required: props.required,
          onBlur() {
            setIsTouched(false);
          },
          onChange(event) {
            props.onChange && props.onChange(event);
          },
        })}
      />
      {/* <input
        className={`form-control ${props.className}`}
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        defaultValue={props.defaultValue}
        required={props.required}
        autoFocus={props.autoFocus}
        min={1}
        onFocus={() => setIsTouched(true)}
        onBlur={() => setIsTouched(false)}
        {...props.register(props.label)}
      /> */}
    </div>
  );
};

export default Input;
