import { H3, P } from "@/presentation/typography";
import { Brand, Button, FullScreenModal, LinkButton } from "../../atoms";
import { CardMovieContent, Container, FooterContent, PMessage } from "./styles";
import { MovieCard } from "../../molecules";
import { MovieEntity } from "@/domain/entities";
import Puzzle from "../../../../../public/assets/icons/puzzle.svg";

export interface IShowMovie {
  movie?: MovieEntity;
  onChangeAnotherMovie: () => void;
  goBack: () => void;
}

function ShowMovie({ movie, onChangeAnotherMovie, goBack }: IShowMovie) {
  return (
    movie && (
      <FullScreenModal
        isOpen
        type="primary"
        aria-labelledby="movie-modal-title"
        aria-describedby="movie-modal-desc"
      >
        <Container>
          <Brand />
          <PMessage>
            Aí está!
            <br />
            Baseado nas suas escolhas, achamos o filme perfeito para você.
            Prepare a pipoca e divirta-se!
          </PMessage>
          <CardMovieContent>
            <MovieCard {...movie.toJSON} onClick={() => {}} align="center" />
          </CardMovieContent>
          <FooterContent>
            <Button
              icon={<Puzzle />}
              onClick={onChangeAnotherMovie}
              fullWidth
              secondColor
            >
              Sugerir outro
            </Button>
            <LinkButton onClick={goBack}>Voltar</LinkButton>
          </FooterContent>
        </Container>
      </FullScreenModal>
    )
  );
}

export { ShowMovie };
