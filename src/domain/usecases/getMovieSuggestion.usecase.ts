import { MoviesRepository } from "@/domain/repositories";
import { GetMovieSuggestionUsecase } from "@/domain/usecases/interfaces";
import { UnexpectedError } from "../errors";

export class GetMovieSuggestionUsecaseImpl
  implements GetMovieSuggestionUsecase
{
  constructor(private readonly repository: MoviesRepository) {}
  async exec(
    params: GetMovieSuggestionUsecase.Params,
  ): Promise<GetMovieSuggestionUsecase.Model> {
    if (params.movies.length === 0) throw new UnexpectedError();

    const listOfMovies = params.movies.map((movie) => movie.title);

    return await this.repository.getMovieSuggestion(listOfMovies);
  }
}
