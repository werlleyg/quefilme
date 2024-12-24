import { GetMoviesUsecase } from "@/domain/usecases/interfaces";
import { makeMoviesRepository } from "../repositories/movies.factory";
import { GetMoviesUsecaseImpl } from "@/domain/usecases";
import { makeTranslatorService } from "../services/translator.factory";

export const makeGetMoviesUsecase = (): GetMoviesUsecase =>
  new GetMoviesUsecaseImpl(makeMoviesRepository(), makeTranslatorService());
