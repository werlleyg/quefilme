import { MoviesRepositoryImpl } from "@/infrastructure/repositories";

import { mock } from "jest-mock-extended";
import { listMoviesMock, movieMock } from "../mocks/getMovieUsecaseImpl.mock";
import { GetMoviesUsecaseImpl } from "@/domain/usecases";
import { TranslatorServiceImpl } from "@/infrastructure/services/translatorImpl.service";
import { languagesEnum } from "@/domain/enums/languages.enum";

type SutTypes = {
  movieRepository: ReturnType<typeof mock<MoviesRepositoryImpl>>;
  translatorService: ReturnType<typeof mock<TranslatorServiceImpl>>;
  sut: GetMoviesUsecaseImpl;
};

const makeSut = (): SutTypes => {
  const movieRepository = mock<MoviesRepositoryImpl>();
  const translatorService = mock<TranslatorServiceImpl>();
  const sut = new GetMoviesUsecaseImpl(movieRepository, translatorService);

  return { sut, movieRepository, translatorService };
};

describe("getMoviesUsecaseImpl", () => {
  const titleMock = "Guardians of the Galaxy Vol. 2";
  const translatedTitleMock = "guardiões da galaxia vol. 2";

  it("Should be instantiated correctly", () => {
    const { sut } = makeSut();

    expect(sut).toBeInstanceOf(GetMoviesUsecaseImpl);
  });

  it("Should call getMovies with the correct title", async () => {
    const { sut, movieRepository, translatorService } = makeSut();

    const params = {
      query: titleMock.trim().toLowerCase(),
      source: languagesEnum.PTBR,
      target: languagesEnum.EN,
    };

    translatorService.translator.mockResolvedValue(translatedTitleMock);

    await sut.exec(titleMock);

    expect(translatorService.translator).toHaveBeenCalledWith(params);

    expect(movieRepository.getMovieList).toHaveBeenCalledWith(
      translatedTitleMock,
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
