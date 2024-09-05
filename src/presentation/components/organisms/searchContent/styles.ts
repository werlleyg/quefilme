import styled from "@emotion/styled";
import { ISearchContent } from ".";
import { css } from "@emotion/react";
interface IContent {
  isOpen: boolean;
}

const Content = styled.form<IContent>`
  width: min(100%, var(--max-width));
  display: flex;
  flex-direction: column;

  ${({ isOpen }) =>
    isOpen &&
    css`
      gap: 20px;
      padding: 62px 20px;
    `};
`;

export { Content };
