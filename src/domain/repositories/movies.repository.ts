import { ListMoviesEntity, MovieEntity } from "../entities";

export interface MoviesRepository {
  getMovie: (imdbID: string) => Promise<MovieEntity>;

  getMovieList: (title: string) => Promise<ListMoviesEntity>;

  getMovieSuggestion: (titles: string[]) => Promise<MovieEntity>;
}
