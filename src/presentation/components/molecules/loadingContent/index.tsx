import { Loader } from "../../atoms";
import { Container, PMessage } from "./styles";

function LoadingContent() {
  return (
    <Container data-testid="loading-container" role="status" aria-live="polite">
      <Loader />
      <PMessage>
        Aguarde enquanto estamos <b>capturando</b> os melhores títulos para você
        ;)
      </PMessage>
    </Container>
  );
}

export { LoadingContent };
