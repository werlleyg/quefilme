import styled from "@emotion/styled";

export const Main = styled.main`
  min-height: 100%;
  width: min(100% - 2.5rem, var(--max-width));
  margin-inline: auto;
  padding-top: 3.125rem;
  padding-bottom: 1.125rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
`;

export const DivTopContent = styled.div``;

export const DivBottomContent = styled.div``;

export const DivChipField = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const DivCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 42px 0 56px 0;
`;

export const DivSelectedField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 26px 0 64px 0px;
`;

export default Main;
