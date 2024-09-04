import { useRef } from "react";
import { Content } from "./styles";
import { ListMoviesEntity, MovieEntity } from "@/domain/entities";
import {
  H3,
  CardMoviesGrid,
  MovieCard,
  SearchInput,
  FullScreenModal,
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

  return (
    <FullScreenModal isOpen={!!value}>
      <Content ref={formRef} isOpen={!!value}>
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
          </>
        )}
      </Content>
    </FullScreenModal>
  );
}

export { SearchContent };
