import styled from "@emotion/styled";
import { ISearchInput } from ".";

type ILabel = Pick<ISearchInput, "secondaryColor">;

const Input = styled.input`
  outline: none;
  background-color: var(--transparent);
  border: none;
  flex-grow: 0;
  font-family: "Archivo";
  font-size: 1rem;
  font-weight: 300;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: rgba(var(--search-input-text-color), 1);
  flex: 1;

  :placeholder {
    color: rgba(var(--search-input-text-color), 0.7);
  }
`;

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

export { Input, Label };
