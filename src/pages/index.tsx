import { Badge, Button, Chip, MovieCard, SearchInput } from "@/presentation";
import Head from "next/head";
import { useCallback, useState } from "react";
import Puzzle from "../../public/assets/icons/puzzle-white.svg";
import { MovieEntity } from "@/domain/entities";

export default function Home() {
  const [value, setValue] = useState<string>();

  const handleChangeInput = useCallback((value?: string) => {
    setValue(value);
  }, []);

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
      <main>
        <SearchInput
          onChange={handleChangeInput}
          placeholder={"Digite o filme que você gosta ..."}
          debounce={2}
          // secondaryColor
        />
        <br />
        {value}
        <br />
        <Button
          icon={<Puzzle />}
          onClick={(e) => alert("teste")}
          // secondColor
          fullWidth
          // disabled
        >
          Sugerir filme
        </Button>
        <br />
        <Badge>Filme</Badge>
        <br />
        <Chip onClick={() => alert("delete")}>Avengers: Endgame</Chip>
        <br />
        <div style={{ display: "flex", flexDirection: "row" }}>
          <MovieCard
            {...movieMock.toJSON}
            onClick={() => console.log("click")}
          />
          <MovieCard
            {...movieMock.toJSON}
            onClick={() => console.log("click")}
          />
        </div>
      </main>
    </>
  );
}

export const movieMock = new MovieEntity({
  image:
    "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg",
  imdbID: "tt3896198",
  title: "Guardians of the Galaxy Vol. 2",
  type: "Movie",
  actors: "actors",
  description:
    "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father, the ambitious celestial being Ego.",
  genre: "Action, Adventure, Comedy",
  runtime: "136 min.",
});
