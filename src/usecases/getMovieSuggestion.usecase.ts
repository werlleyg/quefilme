import { UnexpectedError } from "@/domain/errors";
import { MoviesRepository } from "@/domain/repositories";
import { AiService } from "@/domain/services";
import { GetMovieSuggestionUsecase } from "@/domain/usecases";

export class GetMovieSuggestionUsecaseImpl
  implements GetMovieSuggestionUsecase
{
  constructor(
    private readonly repository: MoviesRepository,
    private readonly service: AiService,
  ) {}
  async exec(
    params: GetMovieSuggestionUsecase.Params,
  ): Promise<GetMovieSuggestionUsecase.Model> {
    const listOfMovies = params.movies.map((movie) => movie.title).join(", ");

    const prompt = `Seja direto e siga exatamente o exemplo proposto a seguir após os dois pontos, me indique apenas um filme baseado na lista ${listOfMovies}, mas não pode ser nenhum dessa lista, e coloque seu imdb CORRETO no final, ex: Cidade de Deus - tt0317248`;

    const promptResponse = await this.service.generateResponse(prompt);

    const parts = promptResponse?.split(" - ");
    if (!parts || parts?.length < 2) {
      throw new UnexpectedError();
    }
    const suggestMovieImdb = parts[1];

    return await this.repository.getMovie(suggestMovieImdb);
  }
}
