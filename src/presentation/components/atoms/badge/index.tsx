import { ReactNode } from "react";
import { Div } from "./styles";

export interface IBadge {
  children: ReactNode;
}

function Badge({ children }: IBadge) {
  return <Div>{children}</Div>;
}

export { Badge };
