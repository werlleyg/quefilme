import styled from "@emotion/styled";
import { IIconButton } from ".";

type ICustomIconButton = IIconButton;

const CustomIconButtom = styled.button<ICustomIconButton>`
  border-radius: 50%;
  padding: 1px;
  border: 0;
  aspect-ratio: 1/1;
  background-color: var(--transparent);

  :hover {
    opacity: 0.8;
  }
  :disabled {
    opacity: 0.4;
    pointer-events: none;
  }
`;

export { CustomIconButtom };
