import styled from "@emotion/styled";
import { ISearchInput } from ".";

type ILabel = Pick<ISearchInput, "secondaryColor">;

const Label = styled.label<ILabel>`
  width: 100%;
  height: 3.5rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.25rem;
  padding: 1.25rem 1rem;
  border-radius: 8px;
  background-color: ${({ secondaryColor }) =>
    secondaryColor
      ? "var(--search-input-background-secondary-color)"
      : "var(--search-input-background-color)"};

  :focus-within {
    outline: 2px solid var(--primary-color);
  }
`;

export { Label };
