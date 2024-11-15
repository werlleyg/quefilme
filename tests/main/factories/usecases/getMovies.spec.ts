import { MoviesRepositoryImpl } from "@/infrastructure/repositories";
import { MoviesRepository } from "@/domain/repositories";
import { GetMoviesUsecase } from "@/domain/usecases";
import { AxiosHttpClient } from "@/infrastructure/http";
import { GetMoviesUsecaseImpl } from "@/infrastructure/usecases";

type SutTypes = {
  axiosHttpClient: AxiosHttpClient;
  moviesRepository: MoviesRepository;
  sut: GetMoviesUsecase;
};

const makeSut = (): SutTypes => {
  const axiosHttpClient = new AxiosHttpClient();
  const moviesRepository = new MoviesRepositoryImpl(axiosHttpClient);
  const sut = new GetMoviesUsecaseImpl(moviesRepository);
  return {
    sut,
    moviesRepository,
    axiosHttpClient,
  };
};

describe("makeGetMoviesUsecase factory", () => {
  it("Should be instantiated correctly", () => {
    const { sut } = makeSut();

    expect(sut).toBeInstanceOf(GetMoviesUsecaseImpl);
  });
});
