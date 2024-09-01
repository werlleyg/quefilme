import { ReactNode } from "react";
import { H4Element } from "./styles";

export interface IH4 {
  children: ReactNode;
}

function H4({ children }: IH4) {
  return <H4Element>{children}</H4Element>;
}

export { H4 };
