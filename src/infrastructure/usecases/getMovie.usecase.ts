import { MoviesRepository } from "@/domain/repositories";
import { GetMovieUsecase } from "@/domain/usecases";

export class GetMovieUsecaseImpl implements GetMovieUsecase {
  constructor(private readonly repository: MoviesRepository) {}

  async exec(imdbID: GetMovieUsecase.Params): Promise<GetMovieUsecase.Model> {
    return await this.repository.getMovie(imdbID);
  }
}
