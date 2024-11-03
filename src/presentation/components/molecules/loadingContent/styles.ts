import { P } from "@/presentation/typography";
import styled from "@emotion/styled";

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  animation: fade-in-animation var(--transition-time, 300ms);
  background: linear-gradient(
      336deg,
      rgba(var(--loading-content-background-color), 1),
      rgba(var(--loading-content-background-color), 0) 90%
    ),
    linear-gradient(
      127deg,
      rgba(var(--loading-content-background-color), 1),
      rgba(var(--loading-content-background-color), 0) 90%
    ),
    linear-gradient(
      217deg,
      rgba(var(--loading-content-background-color), 1),
      rgba(var(--loading-content-background-color), 0) 90%
    );
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  z-index: var(--z-index-loading, 1001);
`;

const PMessage = styled(P)`
  width: min(100% - 1rem, 350px);
  text-align: center;
  font-weight: 200;
`;

export { Container, PMessage };
