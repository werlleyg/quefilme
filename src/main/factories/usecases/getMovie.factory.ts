import { GetMovieUsecase } from "@/domain/usecases";
import { makeMoviesRepository } from "../repositories/movies.factory";
import { GetMovieUsecaseImpl } from "@/infrastructure/usecases";

export const makeGetMovieUsecase = (): GetMovieUsecase =>
  new GetMovieUsecaseImpl(makeMoviesRepository());
