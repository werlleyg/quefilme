import { GetMovieSuggestionUsecase } from "@/domain/usecases";

import { makeMoviesRepository } from "../repositories/movies.factory";
import { makeAiService } from "../services/ai.factory";
import { GetMovieSuggestionUsecaseImpl } from "@/infrastructure/usecases/getMovieSuggestion.usecase";

export const makeGetMovieSuggestionUsecase = (): GetMovieSuggestionUsecase =>
  new GetMovieSuggestionUsecaseImpl(makeMoviesRepository(), makeAiService());
