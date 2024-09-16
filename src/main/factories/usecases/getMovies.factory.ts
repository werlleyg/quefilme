import { GetMoviesUsecase } from "@/domain/usecases";
import { GetMoviesUsecaseImpl } from "@/usecases";
import { makeMoviesRepository } from "../repositories/movies.factory";

export const makeGetMoviesUsecase = (): GetMoviesUsecase =>
  new GetMoviesUsecaseImpl(makeMoviesRepository());
