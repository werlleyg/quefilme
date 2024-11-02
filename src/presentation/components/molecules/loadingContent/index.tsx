import { P } from "@/presentation/typography";
import { Loader } from "../../atoms";
import { Container } from "./styles";

function LoadingContent() {
  return (
    <Container>
      <Loader />
      <P
        style={{
          width: "min(100% - 1rem, 350px)",
          textAlign: "center",
          fontWeight: 200,
        }}
      >
        Aguarde enquanto estamos <b>capturando</b> os melhores títulos para você
        ;)
      </P>
    </Container>
  );
}

export { LoadingContent };
