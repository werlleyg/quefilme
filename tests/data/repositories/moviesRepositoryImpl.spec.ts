import { MoviesRepositoryImpl } from "@/data/repositories/moviesImpl.repository";
import {
  HttpClientSpy,
  mockGetMovieRepositoryImpl,
  mockGetMoviesRepositoryImpl,
} from "../mocks";
import { HttpStatusCode } from "@/data/protocols/http";
import { Environment } from "@/main/config";
import {
  AccessDeniedError,
  NotFoundError,
  UnexpectedError,
} from "@/domain/errors";
import { ListMoviesEntity, MovieEntity } from "@/domain/entities";

type SutTypes = {
  sut: MoviesRepositoryImpl;
  httpClientSpy: HttpClientSpy;
};

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy();
  const sut = new MoviesRepositoryImpl(httpClientSpy);

  return { sut, httpClientSpy };
};

const makeUrlWithImdbID = (imdbID: string) =>
  `${Environment.baseUrl}?i=${imdbID}&apikey=${Environment.accessKey}`;
const makeUrlWithTitle = (title?: string) =>
  `${Environment.baseUrl}?s=${title}&apikey=${Environment.accessKey}`;

const searchTitle = "Guardians of the Galaxy Vol. 2";

describe("MoviesRepositoryImpl", () => {
  describe("getMovie", () => {
    test("Should call getMovie with correct method", async () => {
      const { sut, httpClientSpy } = makeSut();
      httpClientSpy.response = {
        statusCode: HttpStatusCode.ok,
        body: mockGetMovieRepositoryImpl,
      };

      const result = await sut.getMovie(mockGetMovieRepositoryImpl.imdbID);

      expect(httpClientSpy.url).toBe(
        makeUrlWithImdbID(mockGetMovieRepositoryImpl.imdbID),
      );
      expect(httpClientSpy.method).toBe("get");
      expect(result).toBeInstanceOf(MovieEntity);
    });

    test("Should throw AccessDeniedError if getMovie returns 403", async () => {
      const { sut, httpClientSpy } = makeSut();
      httpClientSpy.response = {
        statusCode: HttpStatusCode.forbidden,
        body: {},
      };

      await expect(
        sut.getMovie(mockGetMovieRepositoryImpl.imdbID),
      ).rejects.toThrow(new AccessDeniedError());
    });

    test("Should throw NotFoundError if getMovie returns Response = 'False' ", async () => {
      const { sut, httpClientSpy } = makeSut();
      httpClientSpy.response = {
        statusCode: HttpStatusCode.ok,
        body: {
          Response: "False",
        },
      };

      await expect(
        sut.getMovie(mockGetMovieRepositoryImpl.imdbID),
      ).rejects.toThrow(new NotFoundError());
    });

    test("Should throw UnexpectedError if getMovie returns 500 ", async () => {
      const { sut, httpClientSpy } = makeSut();
      httpClientSpy.response = {
        statusCode: HttpStatusCode.serverError,
        body: {},
      };

      await expect(
        sut.getMovie(mockGetMovieRepositoryImpl.imdbID),
      ).rejects.toThrow(new UnexpectedError());
    });
  });

  describe("getMovieList", () => {
    test("Should call getMovieList with correct method", async () => {
      const { sut, httpClientSpy } = makeSut();
      httpClientSpy.response = {
        statusCode: HttpStatusCode.ok,
        body: mockGetMoviesRepositoryImpl,
      };

      const result = await sut.getMovieList(searchTitle);

      expect(httpClientSpy.url).toBe(makeUrlWithTitle(searchTitle));
      expect(httpClientSpy.method).toBe("get");
      expect(result).toBeInstanceOf(ListMoviesEntity);
    });

    test("Should throw AccessDeniedError if getMovieList returns 403", async () => {
      const { sut, httpClientSpy } = makeSut();
      httpClientSpy.response = {
        statusCode: HttpStatusCode.forbidden,
        body: {},
      };

      await expect(sut.getMovieList(searchTitle)).rejects.toThrow(
        new AccessDeniedError(),
      );
    });

    test("Should return empty array if getMovieList returns Response = 'False' ", async () => {
      const { sut, httpClientSpy } = makeSut();
      httpClientSpy.response = {
        statusCode: HttpStatusCode.ok,
        body: {
          Response: "False",
        },
      };

      const result = await sut.getMovieList(searchTitle);

      expect(result).toBeInstanceOf(ListMoviesEntity);
      expect(result.movies).toEqual([]);
    });

    test("Should throw UnexpectedError if getMovieList returns 500 ", async () => {
      const { sut, httpClientSpy } = makeSut();
      httpClientSpy.response = {
        statusCode: HttpStatusCode.serverError,
        body: {},
      };

      await expect(sut.getMovieList(searchTitle)).rejects.toThrow(
        new UnexpectedError(),
      );
    });
  });
});
