import {
  Badge,
  Button,
  CardMoviesGrid,
  Chip,
  MovieCard,
  SearchInput,
} from "@/presentation";
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
      <main></main>
    </>
  );
}
