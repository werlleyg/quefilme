import { ListMoviesEntity, MovieEntity } from "../entities";

export interface GetMovieSuggestionUsecase {
  exec: (
    params: GetMovieSuggestionUsecase.Params,
  ) => Promise<GetMovieSuggestionUsecase.Model>;
}

export namespace GetMovieSuggestionUsecase {
  export type Params = ListMoviesEntity;
  export type Model = MovieEntity;
}
