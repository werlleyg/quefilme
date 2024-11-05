import { MoviesRepositoryImpl } from "@/infrastructure/repositories";

import { mock } from "jest-mock-extended";
import { listMoviesMock, movieMock } from "../mocks/getMovieUsecaseImpl.mock";
import { GetMoviesUsecaseImpl } from "@/infrastructure/usecases";

type SutTypes = {
  movieRepository: ReturnType<typeof mock<MoviesRepositoryImpl>>;
  sut: GetMoviesUsecaseImpl;
};

const makeSut = (): SutTypes => {
  const movieRepository = mock<MoviesRepositoryImpl>();
  const sut = new GetMoviesUsecaseImpl(movieRepository);

  return { sut, movieRepository };
};

describe("getMoviesUsecaseImpl", () => {
  const titleMock = "Guardians of the Galaxy Vol. 2";

  it("Should be instantiated correctly", () => {
    const { sut } = makeSut();

    expect(sut).toBeInstanceOf(GetMoviesUsecaseImpl);
  });

  it("Should call getMovies with the correct title", async () => {
    const { sut, movieRepository } = makeSut();

    await sut.exec(titleMock);

    expect(movieRepository.getMovieList).toHaveBeenCalledWith(
      titleMock.trim().toLowerCase(),
    );
  });

  it("Should return the correct movies when repository returns a list movies", async () => {
    const { sut, movieRepository } = makeSut();

    movieRepository.getMovieList.mockResolvedValue(listMoviesMock);

    const result = await sut.exec(titleMock);

    expect(result).toEqual(listMoviesMock);
  });

  it("Should handle errors thrown by the repository", async () => {
    const { sut, movieRepository } = makeSut();

    const error = new Error("Repository generic error");
    movieRepository.getMovieList.mockRejectedValue(error);

    await expect(sut.exec(titleMock)).rejects.toThrow(
      "Repository generic error",
    );
  });
});
