import { ButtonHTMLAttributes, ReactNode } from "react";
import { CustomIconButtom } from "./styles";

export interface IIconButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function IconButton(props: IIconButton) {
  const { children = "" } = props;
  return <CustomIconButtom {...props}>{children}</CustomIconButtom>;
}

export { IconButton };
