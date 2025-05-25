import { GetMovieSuggestionUsecase } from "@/domain/usecases/interfaces";

import { makeMoviesRepository } from "../repositories/movies.factory";
import { GetMovieSuggestionUsecaseImpl } from "@/domain/usecases/getMovieSuggestion.usecase";

export const makeGetMovieSuggestionUsecase = (): GetMovieSuggestionUsecase =>
  new GetMovieSuggestionUsecaseImpl(makeMoviesRepository());
