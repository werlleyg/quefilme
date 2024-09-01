import styled from "@emotion/styled";

const CustomCard = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  padding: 8px;
  border-radius: 8px;
  cursor: pointer;
  transition: var(--transition-time);

  :hover {
    opacity: 0.8;
  }
`;

export { CustomCard };
