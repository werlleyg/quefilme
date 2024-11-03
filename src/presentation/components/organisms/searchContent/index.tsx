import { FormEvent, useCallback, useRef } from "react";
import { Content } from "./styles";
import { ListMoviesEntity, MovieEntity } from "@/domain/entities";
import {
  H3,
  CardMoviesGrid,
  MovieCard,
  SearchInput,
  FullScreenModal,
  P,
} from "@/presentation";

export interface ISearchContent {
  value?: string;
  handleChangeInput: (e?: string | undefined) => void;
  movies?: ListMoviesEntity;
  onSelect: (e: MovieEntity) => void;
}

function SearchContent({
  handleChangeInput,
  value,
  movies,
  onSelect,
}: ISearchContent) {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  return (
    <FullScreenModal isOpen={!!value}>
      <Content ref={formRef} isOpen={!!value} onSubmit={handleSubmit}>
        <SearchInput
          onChange={handleChangeInput}
          placeholder={"Digite o filme que você gosta ..."}
          debounce={2}
          secondaryColor={!!value}
        />
        {!!value && (
          <>
            {" "}
            <H3>Selecione o filme abaixo</H3>
            <CardMoviesGrid>
              {movies?.movies.map((movie, idx) => (
                <MovieCard
                  {...movie.toJSON}
                  onClick={() => {
                    onSelect(movie);
                    formRef?.current?.reset();
                  }}
                  key={idx}
                />
              ))}
            </CardMoviesGrid>
            {movies?.movies?.length === 0 && (
              <P style={{ fontWeight: 200, textAlign: "center" }}>
                Sinto muito, parece que náo conseguimos encontrar nenhum título
                com este nome. Sugiro que efetue outra busca e lembre-se de
                utilizar o título original da obra.
              </P>
            )}
          </>
        )}
      </Content>
    </FullScreenModal>
  );
}

export { SearchContent };
