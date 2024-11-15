import { MoviesRepositoryImpl } from "@/infrastructure/repositories";
import { MoviesRepository } from "@/domain/repositories";
import { AxiosHttpClient } from "@/infrastructure/http";

type SutTypes = {
  axiosHttpClient: AxiosHttpClient;
  sut: MoviesRepository;
};

const makeSut = (): SutTypes => {
  const axiosHttpClient = new AxiosHttpClient();
  const sut = new MoviesRepositoryImpl(axiosHttpClient);
  return {
    sut,
    axiosHttpClient,
  };
};

describe("makeMoviesRepository factory", () => {
  it("Should be instantiated correctly", () => {
    const { sut } = makeSut();

    expect(sut).toBeInstanceOf(MoviesRepositoryImpl);
  });
});
