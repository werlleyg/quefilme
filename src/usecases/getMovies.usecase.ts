import { MoviesRepository } from "@/domain/repositories";
import { GetMoviesUsecase } from "@/domain/usecases";

export class GetMoviesUsecaseImpl implements GetMoviesUsecase {
  constructor(private readonly repository: MoviesRepository) {}

  async exec(title: GetMoviesUsecase.Params): Promise<GetMoviesUsecase.Model> {
    return await this.repository.getMovieList(title);
  }
}
