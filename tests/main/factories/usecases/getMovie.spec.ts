import { MoviesRepositoryImpl } from "@/data/repositories";
import { MoviesRepository } from "@/domain/repositories";
import { GetMovieUsecase } from "@/domain/usecases";
import { AxiosHttpClient } from "@/infrastructure/http";
import { GetMovieUsecaseImpl } from "@/usecases";

type SutTypes = {
  axiosHttpClient: AxiosHttpClient;
  moviesRepository: MoviesRepository;
  sut: GetMovieUsecase;
};

const makeSut = (): SutTypes => {
  const axiosHttpClient = new AxiosHttpClient();
  const moviesRepository = new MoviesRepositoryImpl(axiosHttpClient);
  const sut = new GetMovieUsecaseImpl(moviesRepository);
  return {
    sut,
    moviesRepository,
    axiosHttpClient,
  };
};

describe("makeGetMovieUsecase factory", () => {
  it("Should be instantiated correctly", () => {
    const { sut } = makeSut();

    expect(sut).toBeInstanceOf(GetMovieUsecaseImpl);
  });
});
