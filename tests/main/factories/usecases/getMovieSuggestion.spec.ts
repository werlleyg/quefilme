import { MoviesRepositoryImpl } from "@/infrastructure/repositories";

import { MoviesRepository } from "@/domain/repositories";
import { AiService } from "@/domain/services";
import { GetMovieSuggestionUsecase, GetMoviesUsecase } from "@/domain/usecases";
import { AxiosHttpClient } from "@/infrastructure/http";
import { Environment } from "@/main/config";
import { AiServiceImpl } from "@/infrastructure/services";
import { GetMovieSuggestionUsecaseImpl } from "@/domain/usecases/getMovieSuggestion.usecase";

type SutTypes = {
  axiosHttpClient: AxiosHttpClient;
  aiService: AiService;
  moviesRepository: MoviesRepository;
  sut: GetMovieSuggestionUsecase;
};

const makeSut = (): SutTypes => {
  const axiosHttpClient = new AxiosHttpClient();
  const aiService = new AiServiceImpl(axiosHttpClient, Environment.baseUrlAi);
  const moviesRepository = new MoviesRepositoryImpl(axiosHttpClient);
  const sut = new GetMovieSuggestionUsecaseImpl(moviesRepository, aiService);
  return {
    sut,
    aiService,
    moviesRepository,
    axiosHttpClient,
  };
};

describe("makeGetMovieSuggestionUsecase factory", () => {
  it("Should be instantiated correctly", () => {
    const { sut } = makeSut();

    expect(sut).toBeInstanceOf(GetMovieSuggestionUsecaseImpl);
  });
});
