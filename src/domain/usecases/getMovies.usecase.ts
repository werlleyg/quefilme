import { MoviesRepository } from "@/domain/repositories";
import { GetMoviesUsecase } from "@/domain/usecases/interfaces";
import { TranslatorService } from "../services/translator.service";
import { languagesEnum } from "../enums/languages.enum";

export class GetMoviesUsecaseImpl implements GetMoviesUsecase {
  constructor(
    private readonly repository: MoviesRepository,
    private readonly translatorService: TranslatorService,
  ) {}

  async exec(title: GetMoviesUsecase.Params): Promise<GetMoviesUsecase.Model> {
    const params: TranslatorService.Params = {
      query: title.trim().toLowerCase(),
      source: languagesEnum.PTBR,
      target: languagesEnum.EN,
    };
    const translatedTitle = await this.translatorService.translator(params);

    return await this.repository.getMovieList(
      translatedTitle?.trim()?.toLowerCase(),
    );
  }
}
