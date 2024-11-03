import { GetMovieSuggestionUsecase } from "@/domain/usecases";

import { makeMoviesRepository } from "../repositories/movies.factory";
import { GetMovieSuggestionUsecaseImpl } from "@/usecases/getMovieSuggestion.usecase";
import { makeAiService } from "../services/ai.factory";

export const makeGetMovieSuggestionUsecase = (): GetMovieSuggestionUsecase =>
  new GetMovieSuggestionUsecaseImpl(makeMoviesRepository(), makeAiService());
