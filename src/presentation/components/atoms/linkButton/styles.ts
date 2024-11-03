import styled from "@emotion/styled";

const Container = styled.button`
  font-family: "Archivo";
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: var(--link-button-color);
  background: var(--transparent);
  border: 0;
  width: fit-content;

  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: 2px solid var(--focus-color);
    outline-offset: 2px;
  }

  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

export { Container };
