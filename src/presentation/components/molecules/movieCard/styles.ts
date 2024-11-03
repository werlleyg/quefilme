import styled from "@emotion/styled";
import { IMovieCard } from ".";

type ICustomCard = Pick<IMovieCard, "align">;

const CustomCard = styled.div<ICustomCard>`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: ${({ align }) => _getAlign.get(align!)};
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: var(--transition-time);

  :hover {
    opacity: 0.8;
  }
`;

const _getAlign = new Map<string, string>([
  ["left", "flex-start"],
  ["center", "center"],
]);

export { CustomCard };
