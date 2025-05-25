import { MoviesRepositoryImpl } from "@/infrastructure/repositories";

import { MoviesRepository } from "@/domain/repositories";

import { GetMovieSuggestionUsecase } from "@/domain/usecases/interfaces";
import { AxiosHttpClient } from "@/infrastructure/http";
import { Environment } from "@/main/config";

import { GetMovieSuggestionUsecaseImpl } from "@/domain/usecases/getMovieSuggestion.usecase";

type SutTypes = {
  axiosHttpClient: AxiosHttpClient;
  moviesRepository: MoviesRepository;
  sut: GetMovieSuggestionUsecase;
};

const makeSut = (): SutTypes => {
  const axiosHttpClient = new AxiosHttpClient();
  const moviesRepository = new MoviesRepositoryImpl(axiosHttpClient);
  const sut = new GetMovieSuggestionUsecaseImpl(moviesRepository);
  return {
    sut,
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
