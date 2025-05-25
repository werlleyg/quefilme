import {
  ListMoviesEntity,
  MovieEntity,
  MovieEntityType,
} from "@/domain/entities";
import { MoviesRepository } from "@/domain/repositories";
import { HttpClient, HttpStatusCode } from "../../domain/protocols/http";
import { Environment } from "@/main/config";
import {
  AccessDeniedError,
  NotFoundError,
  UnexpectedError,
} from "@/domain/errors";

export class MoviesRepositoryImpl implements MoviesRepository {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly url: string = Environment.baseUrl;

  async getMovie(imdbID: string): Promise<MovieEntity> {
    let httpResponse = await this.httpClient.request({
      url: `${this.url}/movies/${imdbID}`,
      method: "get",
    });

    const result = httpResponse.body;

    if (result === "False")
      httpResponse = { ...httpResponse, statusCode: HttpStatusCode.notFound };

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return new MovieEntity(result);
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      case HttpStatusCode.notFound:
        throw new NotFoundError();
      default:
        throw new UnexpectedError();
    }
  }

  async getMovieList(title: string): Promise<ListMoviesEntity> {
    let httpResponse = await this.httpClient.request({
      url: `${this.url}/movies?title=${title}`,
      method: "get",
    });
    const result = httpResponse.body;

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: {
        const movies = (Array.isArray(result) ? result : [])?.map(
          (movie: MovieEntityType) => new MovieEntity(movie),
        );
        return new ListMoviesEntity({ movies });
      }
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }

  async getMovieSuggestion(titles: string[]): Promise<MovieEntity> {
    let httpResponse = await this.httpClient.request({
      url: `${this.url}/movies`,
      method: "post",
      body: {
        titles,
      },
    });

    const result = httpResponse.body;

    if (result?.Response === "False")
      httpResponse = { ...httpResponse, statusCode: HttpStatusCode.notFound };

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return new MovieEntity(result);
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      case HttpStatusCode.notFound:
        throw new NotFoundError();
      default:
        throw new UnexpectedError();
    }
  }
}
