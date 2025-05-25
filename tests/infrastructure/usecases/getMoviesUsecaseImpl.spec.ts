import { MoviesRepositoryImpl } from "@/infrastructure/repositories";
import { mock } from "jest-mock-extended";
import { listMoviesMock } from "../mocks/getMovieUsecaseImpl.mock";
import { GetMoviesUsecaseImpl } from "@/domain/usecases";
import { ListMoviesEntity } from "@/domain/entities";

type SutTypes = {
  movieRepository: ReturnType<typeof mock<MoviesRepositoryImpl>>;
  sut: GetMoviesUsecaseImpl;
};

const makeSut = (): SutTypes => {
  const movieRepository = mock<MoviesRepositoryImpl>();
  const sut = new GetMoviesUsecaseImpl(movieRepository);

  return { sut, movieRepository };
};

describe("GetMoviesUsecaseImpl", () => {
  const titleMock = "Guardians of the Galaxy Vol. 2";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should be instantiated correctly", () => {
    const { sut } = makeSut();
    expect(sut).toBeInstanceOf(GetMoviesUsecaseImpl);
  });

  it("Should pass formatted title to repository", async () => {
    const { sut, movieRepository } = makeSut();
    const untrimmedUpperCase = "  MOVIE TITLE  ";
    movieRepository.getMovieList.mockResolvedValue(listMoviesMock);

    await sut.exec(untrimmedUpperCase);

    expect(movieRepository.getMovieList).toHaveBeenCalledWith("movie title");
    expect(movieRepository.getMovieList).toHaveBeenCalledTimes(1);
  });

  it("Should return movies list when repository succeeds", async () => {
    const { sut, movieRepository } = makeSut();
    movieRepository.getMovieList.mockResolvedValue(listMoviesMock);

    const result = await sut.exec(titleMock);

    expect(result).toEqual(listMoviesMock);
  });

  it("Should call repository with empty string for empty input", async () => {
    const { sut, movieRepository } = makeSut();
    const emptyList = new ListMoviesEntity({ movies: [] });
    movieRepository.getMovieList.mockResolvedValue(emptyList);

    const result = await sut.exec("");

    expect(movieRepository.getMovieList).toHaveBeenCalledWith("");
    expect(result).toEqual(emptyList);
  });

  it("Should call repository with empty string for undefined input", async () => {
    const { sut, movieRepository } = makeSut();
    const emptyList = new ListMoviesEntity({ movies: [] });
    movieRepository.getMovieList.mockResolvedValue(emptyList);

    const result = await sut.exec(undefined as any);

    expect(movieRepository.getMovieList).toHaveBeenCalledWith(undefined);
    expect(result).toEqual(emptyList);
  });

  it("Should call repository with empty string for null input", async () => {
    const { sut, movieRepository } = makeSut();
    const emptyList = new ListMoviesEntity({ movies: [] });
    movieRepository.getMovieList.mockResolvedValue(emptyList);

    const result = await sut.exec(null as any);

    expect(movieRepository.getMovieList).toHaveBeenCalledWith(undefined);
    expect(result).toEqual(emptyList);
  });

  it("Should handle repository errors", async () => {
    const { sut, movieRepository } = makeSut();
    const error = new Error("Repository error");
    movieRepository.getMovieList.mockRejectedValue(error);

    await expect(sut.exec(titleMock)).rejects.toThrow("Repository error");
  });
});
