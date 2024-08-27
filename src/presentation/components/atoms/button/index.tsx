import { ButtonHTMLAttributes, ReactNode } from "react";
import { CustomButtom } from "./styles";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  fullWidth?: boolean;
  secondColor?: boolean;
}

function Button(props: IButton) {
  const { children = "", icon } = props;
  return (
    <CustomButtom {...props}>
      {icon}
      {children}
    </CustomButtom>
  );
}

export { Button };
