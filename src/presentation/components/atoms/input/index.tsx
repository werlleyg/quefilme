import { InputHTMLAttributes } from "react";
import { CustomInput } from "./styles";
export interface IInput extends InputHTMLAttributes<HTMLInputElement> {}

function Input(props: IInput) {
  return <CustomInput {...props} />;
}

export { Input };
