import { ButtonHTMLAttributes, ReactNode } from "react";
import { Container } from "./styles";

export interface ILinkButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function LinkButton(props: ILinkButton) {
  return <Container {...props}>{props.children}</Container>;
}

export { LinkButton };
