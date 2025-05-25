import { ListMoviesEntity, MovieEntity } from "@/domain/entities";

export const movieMock = new MovieEntity({
  image:
    "https://m.media-amazon.com/images/M/MV5BNjM0NTc0NzItM2FlYS00YzEwLWE0YmUtNTA2ZWIzODc2OTgxXkEyXkFqcGdeQXVyNTgwNzIyNzg@._V1_SX300.jpg",
  imdbID: "tt3896198",
  title: "Guardians of the Galaxy Vol. 2",
  type: "type",
  actors: "actors",
  description:
    "The Guardians struggle to keep together as a team while dealing with their personal family issues, notably Star-Lord's encounter with his father, the ambitious celestial being Ego.",
  genre: "Action, Adventure, Comedy",
  runtime: "136 min.",
});

export const listMoviesMock: ListMoviesEntity = new ListMoviesEntity({
  movies: new Array(5).fill(movieMock),
});

export const mockGenerateResponse = movieMock;
