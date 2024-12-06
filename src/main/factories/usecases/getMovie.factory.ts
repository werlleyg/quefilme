import { GetMovieUsecase } from "@/domain/usecases/interfaces";
import { makeMoviesRepository } from "../repositories/movies.factory";
import { GetMovieUsecaseImpl } from "@/domain/usecases";

export const makeGetMovieUsecase = (): GetMovieUsecase =>
  new GetMovieUsecaseImpl(makeMoviesRepository());
