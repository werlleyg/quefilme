import { P } from "@/presentation/typography";
import styled from "@emotion/styled";
import Link from "next/link";

const Container = styled.div`
  width: min(100% - 40px, 100%);
  margin-inline: auto;
  margin-top: 50px;
  margin-bottom: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: fade-in-animation var(--transition-time, 300ms);
`;

const PMessage = styled(P)`
  margin: 42px 0 40px 0;
  text-align: center;
`;

const CardMovieContent = styled.div`
  width: min(100%, 265px);
  margin-bottom: 52px;
  animation: fade-in-animation calc(var(--transition-time, 0.3s) + 2s);
`;

const FooterContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export { Container, PMessage, CardMovieContent, FooterContent };
