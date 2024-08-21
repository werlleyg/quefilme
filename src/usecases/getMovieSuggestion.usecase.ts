import { MoviesRepository } from "@/domain/repositories";
import { AiService } from "@/domain/services";
import { getMovieSuggestionUsecase } from "@/domain/usecases";

export class GetMovieSuggestionImpl implements getMovieSuggestionUsecase {
  constructor(
    private readonly repository: MoviesRepository,
    private readonly service: AiService,
  ) {}
  async exec(
    params: getMovieSuggestionUsecase.Params,
  ): Promise<getMovieSuggestionUsecase.Model> {
    const listOfMovies = params.movies.map((movie) => movie.title).join(", ");

    const prompt = `Seja direto e siga exatamente o modelo propost, me indique um filme baseado na lista ${listOfMovies} e coloque seu imdb CORRETO no final, ex: Cidade de Deus - tt0317248`;

    const promptResponse = await this.service.generateResponse(prompt);

    const suggestMovieImdb = promptResponse.split(" - ")[1];

    return await this.repository.getMovie(suggestMovieImdb);
  }
}
