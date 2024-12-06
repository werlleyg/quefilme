import { MoviesRepositoryImpl } from "@/infrastructure/repositories";

import { mock } from "jest-mock-extended";
import { movieMock } from "../mocks/getMovieUsecaseImpl.mock";
import { GetMovieUsecaseImpl } from "@/domain/usecases";

type SutTypes = {
  movieRepository: ReturnType<typeof mock<MoviesRepositoryImpl>>;
  sut: GetMovieUsecaseImpl;
};

const makeSut = (): SutTypes => {
  const movieRepository = mock<MoviesRepositoryImpl>();
  const sut = new GetMovieUsecaseImpl(movieRepository);

  return { sut, movieRepository };
};

describe("getMovieUsecaseImpl", () => {
  const imdbIDMock = "tt0111161";

  it("Should be instantiated correctly", () => {
    const { sut } = makeSut();

    expect(sut).toBeInstanceOf(GetMovieUsecaseImpl);
  });

  it("Should call getMovie with the correct imdbID", async () => {
    const { sut, movieRepository } = makeSut();

    await sut.exec(imdbIDMock);

    expect(movieRepository.getMovie).toHaveBeenCalledWith(imdbIDMock);
  });

  it("Should return the correct movie when repository returns a movie", async () => {
    const { sut, movieRepository } = makeSut();

    movieRepository.getMovie.mockResolvedValue(movieMock);

    const result = await sut.exec(imdbIDMock);

    expect(result).toEqual(movieMock);
  });

  it("Should handle errors thrown by the repository", async () => {
    const { sut, movieRepository } = makeSut();

    const error = new Error("Repository generic error");
    movieRepository.getMovie.mockRejectedValue(error);

    await expect(sut.exec(imdbIDMock)).rejects.toThrow(
      "Repository generic error",
    );
  });
});
