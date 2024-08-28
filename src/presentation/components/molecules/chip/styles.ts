import styled from "@emotion/styled";

const Div = styled.div`
  width: fit-content;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.625rem;
  padding: 0.375rem 0.625rem;
  border-radius: 12px;
  background-color: var(--chip-background-color);

  flex-grow: 0;
  font-family: "Archivo";
  font-size: 1rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: var(--chip-text-color);
`;

export { Div };
