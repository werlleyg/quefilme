import { MoviesRepositoryImpl } from "@/data/repositories";
import { AiServiceImpl } from "@/data/services";
import { GetMovieSuggestionUsecaseImpl } from "@/usecases/getMovieSuggestion.usecase";
import { mock } from "jest-mock-extended";
import {
  listMoviesMock,
  mockGenerateResponse,
  movieMock,
} from "./mocks/getMovieSuggestionUsecaseImpl.mock";
import { ListMoviesEntity } from "@/domain/entities";
import { UnexpectedError } from "@/domain/errors";

type SutTypes = {
  repository: ReturnType<typeof mock<MoviesRepositoryImpl>>;
  service: ReturnType<typeof mock<AiServiceImpl>>;
  sut: GetMovieSuggestionUsecaseImpl;
};

const makeSut = (): SutTypes => {
  const repository = mock<MoviesRepositoryImpl>();
  const service = mock<AiServiceImpl>();
  const sut = new GetMovieSuggestionUsecaseImpl(repository, service);

  return { sut, repository, service };
};

const makePrompt = (listMovies: ListMoviesEntity) => {
  const listOfMovies = listMovies.movies.map((movie) => movie.title).join(", ");

  return `Seja direto e siga exatamente o modelo propost, me indique um filme baseado na lista ${listOfMovies} e coloque seu imdb CORRETO no final, ex: Cidade de Deus - tt0317248`;
};

describe("getMovieSuggestionImpl", () => {
  it("Should be instantiated correctly", () => {
    const { sut } = makeSut();

    expect(sut).toBeInstanceOf(GetMovieSuggestionUsecaseImpl);
  });

  it("Should call generateResponse and getMovie with the correct movies and imdbID", async () => {
    const { sut, repository, service } = makeSut();
    service.generateResponse.mockReturnValue(
      Promise.resolve(mockGenerateResponse),
    );

    await sut.exec(listMoviesMock);

    expect(service.generateResponse).toHaveBeenCalledWith(
      makePrompt(listMoviesMock),
    );
    expect(repository.getMovie).toHaveBeenCalledWith(movieMock.imdbID);
  });

  it("Should return the correct movie when repository returns a movie", async () => {
    const { sut, repository, service } = makeSut();
    service.generateResponse.mockReturnValue(
      Promise.resolve(mockGenerateResponse),
    );

    repository.getMovie.mockResolvedValue(movieMock);

    const result = await sut.exec(listMoviesMock);

    expect(result).toEqual(movieMock);
  });

  it("Should throw UnexpectedError if service response format is invalid", async () => {
    const { sut } = makeSut();

    await expect(sut.exec(listMoviesMock)).rejects.toThrow(
      new UnexpectedError(),
    );
  });

  it("Should handle errors thrown by the repository", async () => {
    const { sut, repository, service } = makeSut();
    service.generateResponse.mockReturnValue(
      Promise.resolve(mockGenerateResponse),
    );

    const error = new Error("Repository generic error");
    repository.getMovie.mockRejectedValue(error);

    await expect(sut.exec(listMoviesMock)).rejects.toThrow(
      "Repository generic error",
    );
  });
});
