import styled from "@emotion/styled";

const CustomInput = styled.input`
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
  color: rgba(var(--input-text-color), 1);
  flex: 1;

  :placeholder {
    color: rgba(var(--input-text-color), 0.7);
  }
`;

export { CustomInput };
