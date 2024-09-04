import { ReactNode } from "react";
import { H3Element } from "./styles";

export interface IH3 {
  children: ReactNode;
}

function H3({ children }: IH3) {
  return <H3Element>{children}</H3Element>;
}

export { H3 };
