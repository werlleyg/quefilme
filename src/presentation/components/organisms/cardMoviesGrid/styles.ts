import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const Item = styled.div`
  flex: 1 1 calc(50% - 10px);
  max-width: calc(50%);
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export { Container, Item };
