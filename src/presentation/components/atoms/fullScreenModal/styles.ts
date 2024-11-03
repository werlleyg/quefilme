import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { IFullScreenModal } from ".";

type IContainer = Pick<IFullScreenModal, "isOpen" | "type">;

const Container = styled.div<IContainer>`
  display: flex;
  position: static;
  justify-content: center;
  align-items: flex-start;

  ${({ isOpen, type }) =>
    isOpen &&
    css`
      position: absolute;
      height: 100vh;
      background-color: ${modalBgColor.get(type!)};
      z-index: 1000;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      max-height: 100%;
      overflow: scroll;
    `}
`;

export { Container };

const modalBgColor = new Map<string, string>([
  ["dark", "var(--modal-background-color)"],
  ["primary", "var(--modal-background-primary-color)"],
]);
