import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { IFullScreenModal } from ".";

type IContainer = Pick<IFullScreenModal, "isOpen">;

const Container = styled.div<IContainer>`
  display: flex;
  position: static;
  justify-content: center;
  align-items: flex-start;

  ${({ isOpen }) =>
    isOpen &&
    css`
      position: fixed;
      height: 100vh;
      background-color: var(--modal-background-color);
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
