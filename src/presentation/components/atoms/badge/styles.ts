import styled from "@emotion/styled";

const Div = styled.div`
  width: fit-content;
  flex-grow: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  padding: 0.125rem 1rem;
  border-radius: 4px;
  background-color: var(--badge-background-color);

  flex-grow: 0;
  font-family: Archivo;
  font-size: 0.75rem;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: var(--badge-text-color);

  pointer-events: none;
`;

export { Div };
