import { MovieEntity } from "../entities";

export interface GetMovieUsecase {
  load: (params: GetMovieUsecase.Params) => Promise<GetMovieUsecase.Model>;
}

export namespace GetMovieUsecase {
  export type Params = string;
  export type Model = MovieEntity;
}
