import { ListMoviesEntity } from "../entities";

export interface GetMoviesUsecase {
  load: (params: GetMoviesUsecase.Params) => Promise<GetMoviesUsecase.Model>;
}

export namespace GetMoviesUsecase {
  export type Params = string;
  export type Model = ListMoviesEntity;
}
