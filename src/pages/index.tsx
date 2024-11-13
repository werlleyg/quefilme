import {
  Brand,
  Button,
  Chip,
  H3,
  LoadingContent,
  P,
  SearchContent,
  ShowMovie,
} from "@/presentation";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import Puzzle from "../../public/assets/icons/puzzle-white.svg";
import { ListMoviesEntity, MovieEntity } from "@/domain/entities";
import {
  DivBottomContent,
  DivChipField,
  DivCopy,
  DivSelectedField,
  DivTopContent,
  Main,
} from "./styles";
import { makeGetMoviesUsecase } from "@/main/factories/usecases/getMovies.factory";
import { Environment } from "@/main/config";
import { makeGetMovieSuggestionUsecase } from "@/main/factories/usecases/getMovieSuggestion.factory";
import { toast } from "react-toastify";
import { snackbarMessage } from "@/domain/enums/snackbar.enum";
import Link from "next/link";

export function Home() {
  const [value, setValue] = useState<string>();
  const [searchValue, setSearchValue] = useState<string>();
  const [selectedMovies, setSelectedMovies] = useState<MovieEntity[]>([]);
  const [searchMovies, setSearchMovies] = useState<ListMoviesEntity>();
  const [suggestedMovie, setSuggestedMovie] = useState<MovieEntity>();
  const [loading, setLoading] = useState<boolean>(false);

  const handleChangeInput = useCallback((value?: string) => {
    setValue(value);
  }, []);

  const handleOnSelectMovie = useCallback((movie: MovieEntity) => {
    setSelectedMovies((prev) => {
      if (!prev.some((prevMovie) => prevMovie.imdbID === movie.imdbID)) {
        return [...prev, movie];
      }
      return prev;
    });
    setValue("");
    setSearchValue("");
  }, []);

  const handleWithRemoveMovie = useCallback((movie: MovieEntity) => {
    setSelectedMovies((prev) => {
      return prev.filter((prevMovie) => prevMovie.imdbID !== movie.imdbID);
    });
  }, []);

  const handleWithSearchMovie = useCallback(async (searchData?: string) => {
    if (!searchData) return setLoading(false);

    try {
      const result = await makeGetMoviesUsecase().exec(searchData);
      setSearchMovies(result);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleGetSuggestMovie = useCallback(async () => {
    setLoading(true);
    const listMovies = new ListMoviesEntity({ movies: selectedMovies });

    try {
      const result = await makeGetMovieSuggestionUsecase().exec(listMovies);
      setSuggestedMovie(new MovieEntity(result));
    } catch (e) {
      toast.error(snackbarMessage.SUGGEST_MOVIE_ERROR);
    } finally {
      setLoading(false);
    }
  }, [selectedMovies]);

  const handleWithGoBack = useCallback(() => {
    setSuggestedMovie(undefined);
  }, []);

  useEffect(() => {
    setLoading(true);
    handleWithSearchMovie(searchValue);
  }, [handleWithSearchMovie, searchValue]);

  useEffect(() => {
    const timer = setTimeout(
      () => setSearchValue(value),
      Number(Environment.debounceTime) * 1000,
    );
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <>
      <Head>
        <title>Que Filme</title>
        <meta
          name="description"
          content="Descubra filmes e séries incríveis baseados nas suas escolhas anteriores. O Que Filme sugere os melhores filmes para sua próxima sessão de cinema."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1,  user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <DivTopContent>
          <Brand style={{ marginInline: "auto" }} />
          <DivCopy>
            <P style={{ textAlign: "center", fontWeight: "500" }}>
              Escolha seus filmes favoritos e descubra o próximo que vai te
              conquistar. Nosso algoritmo faz o trabalho duro para você.{" "}
            </P>
            <P style={{ textAlign: "center", fontWeight: "500" }}>
              Relaxe e aproveite a maratona!
            </P>
          </DivCopy>
          <SearchContent
            handleChangeInput={handleChangeInput}
            value={searchValue}
            onSelect={handleOnSelectMovie}
            movies={searchMovies ?? undefined}
          />

          <DivSelectedField>
            <H3>Selecionados</H3>

            <DivChipField>
              {selectedMovies.length >= 1 ? (
                selectedMovies?.map((movie, idx) => (
                  <Chip key={idx} onClick={() => handleWithRemoveMovie(movie)}>
                    {movie.title}
                  </Chip>
                ))
              ) : (
                <P style={{ fontWeight: "300", opacity: "0.7" }}>
                  Nenhum filme selecionado ainda
                </P>
              )}
            </DivChipField>
          </DivSelectedField>

          <Button
            icon={<Puzzle />}
            onClick={handleGetSuggestMovie}
            fullWidth
            disabled={selectedMovies.length === 0}
          >
            Sugerir filme
          </Button>
        </DivTopContent>
        <DivBottomContent>
          <P style={{ fontWeight: 500, textAlign: "center" }}>
            Desenvolvido por{" "}
            <Link
              href="https://www.linkedin.com/in/werlleyg"
              target="_blank"
              style={{ fontWeight: 700 }}
            >
              Werlley Ponte
            </Link>
          </P>
        </DivBottomContent>
        <ShowMovie
          movie={suggestedMovie}
          onChangeAnotherMovie={handleGetSuggestMovie}
          goBack={handleWithGoBack}
        />
        {loading && <LoadingContent />}
      </Main>
    </>
  );
}

export default Home;
