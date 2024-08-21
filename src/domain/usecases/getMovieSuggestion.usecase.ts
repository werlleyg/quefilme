import { ListMoviesEntity, MovieEntity } from "../entities";

export interface getMovieSuggestionUsecase {
  exec: (
    params: getMovieSuggestionUsecase.Params,
  ) => Promise<getMovieSuggestionUsecase.Model>;
}

export namespace getMovieSuggestionUsecase {
  export type Params = ListMoviesEntity;
  export type Model = MovieEntity;
}
