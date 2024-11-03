import { ButtonHTMLAttributes, ReactNode } from "react";
import { CustomIconButton } from "./styles";

export interface IIconButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function IconButton(props: IIconButton) {
  const { children = "" } = props;
  return <CustomIconButton {...props}>{children}</CustomIconButton>;
}

export { IconButton };
