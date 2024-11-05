import { GetMoviesUsecase } from "@/domain/usecases";
import { makeMoviesRepository } from "../repositories/movies.factory";
import { GetMoviesUsecaseImpl } from "@/infrastructure/usecases";

export const makeGetMoviesUsecase = (): GetMoviesUsecase =>
  new GetMoviesUsecaseImpl(makeMoviesRepository());
