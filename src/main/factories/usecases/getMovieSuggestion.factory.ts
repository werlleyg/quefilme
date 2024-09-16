import { GetMovieSuggestionUsecase } from "@/domain/usecases";

import { makeMoviesRepository } from "../repositories/movies.factory";
import { GetMovieSuggestionImpl } from "@/usecases/getMovieSuggestion.usecase";
import { makeAiService } from "../services/ai.factory";

export const makeGetMovieSuggestionUsecase = (): GetMovieSuggestionUsecase =>
  new GetMovieSuggestionImpl(makeMoviesRepository(), makeAiService());
