import { ReactNode } from "react";
import { Div } from "./styles";
import CloseIcon from "../../../../../public/assets/icons/close.svg";
import { IconButton } from "../../atoms/iconButton";

export interface IChip {
  children: ReactNode;
  onClick?: () => void;
}

function Chip({ children, onClick }: IChip) {
  return (
    <Div>
      {children}{" "}
      {!!onClick && (
        <IconButton onClick={onClick}>
          <CloseIcon />
        </IconButton>
      )}
    </Div>
  );
}
export { Chip };
