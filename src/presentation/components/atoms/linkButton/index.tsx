import { ButtonHTMLAttributes, ReactNode } from "react";
import { Container } from "./styles";

export interface ILinkButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function LinkButton({ children, ...props }: ILinkButton) {
  return <Container {...props}>{children}</Container>;
}

export { LinkButton };
