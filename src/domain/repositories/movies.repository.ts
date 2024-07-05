import { MovieEntity } from "../entities";

export interface MoviesRepository {
  getMovie: (imeiDB: string) => Promise<MovieEntity>;

  getMovieList: (title: string) => Promise<MovieEntity[]>;
}
