import styled from "@emotion/styled";
import { IButton } from ".";
import { css } from "@emotion/react";

type ICustomButton = IButton;

const CustomButtom = styled.button<ICustomButton>`
  height: 3.5rem;
  align-self: stretch;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 19px 16px;
  border-radius: 8px;
  background-color: var(--button-background-color);
  border: none;

  flex-grow: 0;
  font-family: "Archivo";
  font-size: 1rem;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: var(--button-text-color);

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `};

  ${({ secondColor }) =>
    secondColor &&
    css`
      color: var(--button-text-second-color);
      background-color: var(--button-background-second-color);
    `};

  :hover {
    opacity: 0.8;
  }
  :disabled {
    opacity: 0.4;
    pointer-events: none;
  }
`;

export { CustomButtom };
