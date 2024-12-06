import { GetMoviesUsecase } from "@/domain/usecases/interfaces";
import { makeMoviesRepository } from "../repositories/movies.factory";
import { GetMoviesUsecaseImpl } from "@/domain/usecases";

export const makeGetMoviesUsecase = (): GetMoviesUsecase =>
  new GetMoviesUsecaseImpl(makeMoviesRepository());
