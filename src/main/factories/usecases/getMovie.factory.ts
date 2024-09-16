import { GetMovieUsecase } from "@/domain/usecases";
import { GetMovieUsecaseImpl } from "@/usecases";
import { makeMoviesRepository } from "../repositories/movies.factory";

export const makeGetMovieUsecase = (): GetMovieUsecase =>
  new GetMovieUsecaseImpl(makeMoviesRepository());
