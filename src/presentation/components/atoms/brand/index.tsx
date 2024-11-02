import { HTMLAttributes, ReactNode } from "react";
import { Div } from "./styles";
import BrandIcon from "../../../../../public/assets/icons/brand.svg";

export type IBrand = HTMLAttributes<HTMLDivElement>;

function Brand(props: IBrand) {
  return (
    <Div {...props} role="img" aria-label="Logo da marca">
      <BrandIcon />
    </Div>
  );
}
export { Brand };
