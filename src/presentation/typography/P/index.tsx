import { HTMLAttributes, ReactNode } from "react";
import { Paragraph } from "./styles";

export interface IP extends HTMLAttributes<HTMLParagraphElement> {
  children?: ReactNode;
}

function P(props: IP) {
  const { children } = props;

  return <Paragraph {...props}>{children}</Paragraph>;
}

export { P };
