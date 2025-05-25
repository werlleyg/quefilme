import { MoviesRepositoryImpl } from "@/infrastructure/repositories";
import { mock } from "jest-mock-extended";
import {
  listMoviesMock,
  mockGenerateResponse,
  movieMock,
} from "../mocks/getMovieSuggestionUsecaseImpl.mock";
import { ListMoviesEntity } from "@/domain/entities";
import { UnexpectedError } from "@/domain/errors";
import { GetMovieSuggestionUsecaseImpl } from "@/domain/usecases/getMovieSuggestion.usecase";

type SutTypes = {
  repository: ReturnType<typeof mock<MoviesRepositoryImpl>>;
  sut: GetMovieSuggestionUsecaseImpl;
};

const makeSut = (): SutTypes => {
  const repository = mock<MoviesRepositoryImpl>();
  const sut = new GetMovieSuggestionUsecaseImpl(repository);

  return { sut, repository };
};

const makeListMovies = (listMovies: ListMoviesEntity) => {
  return listMovies.movies.map((movie) => movie.title);
};

describe("GetMovieSuggestionUsecaseImpl", () => {
  it("Should be instantiated correctly", () => {
    const { sut } = makeSut();
    expect(sut).toBeInstanceOf(GetMovieSuggestionUsecaseImpl);
  });

  it("Should call getMovieSuggestion with correct movie list", async () => {
    const { sut, repository } = makeSut();
    repository.getMovieSuggestion.mockReturnValue(Promise.resolve(movieMock));

    await sut.exec(listMoviesMock);

    expect(repository.getMovieSuggestion).toHaveBeenCalledWith(
      makeListMovies(listMoviesMock),
    );
  });

  it("Should return the correct movie when repository returns a movie", async () => {
    const { sut, repository } = makeSut();
    repository.getMovieSuggestion.mockResolvedValue(movieMock);

    const result = await sut.exec(listMoviesMock);

    expect(result).toEqual(movieMock);
  });

  it("Should throw UnexpectedError if movie list is empty", async () => {
    const { sut } = makeSut();
    const emptyList = new ListMoviesEntity({ movies: [] });

    await expect(sut.exec(emptyList)).rejects.toThrow(new UnexpectedError());
  });

  it("Should handle errors thrown by repository", async () => {
    const { sut, repository } = makeSut();
    const error = new Error("Repository error");
    repository.getMovieSuggestion.mockRejectedValue(error);

    await expect(sut.exec(listMoviesMock)).rejects.toThrow("Repository error");
  });
});
