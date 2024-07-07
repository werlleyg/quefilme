import { MovieEntity } from "../entities";

export interface MoviesRepository {
  getMovie: (imdbID: string) => Promise<MovieEntity>;

  getMovieList: (title: string) => Promise<MovieEntity[]>;
}
