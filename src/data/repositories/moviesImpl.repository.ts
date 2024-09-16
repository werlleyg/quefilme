import { ListMoviesEntity, MovieEntity } from "@/domain/entities";
import { MoviesRepository } from "@/domain/repositories";
import { HttpClient, HttpStatusCode } from "../protocols/http";
import { Environment } from "@/main";
import {
  AccessDeniedError,
  NotFoundError,
  UnexpectedError,
} from "@/domain/errors";
import { movieFromJson, moviesFromJsonList } from "@/helpers";

export class MoviesRepositoryImpl implements MoviesRepository {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly url: string = Environment.baseUrl;
  private readonly accessKey: string = Environment.accessKey;

  async getMovie(imdbID: string): Promise<MovieEntity> {
    let httpResponse = await this.httpClient.request({
      url: `${this.url}?i=${imdbID}&apikey=${this.accessKey}`,
      method: "get",
    });

    const result = httpResponse.body;

    if (result?.Response === "False")
      httpResponse = { ...httpResponse, statusCode: HttpStatusCode.notFound };

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return new MovieEntity(movieFromJson(result));
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      case HttpStatusCode.notFound:
        throw new NotFoundError();
      default:
        throw new UnexpectedError();
    }
  }

  async getMovieList(title: string): Promise<ListMoviesEntity> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}?s=${title}&apikey=${this.accessKey}`,
      method: "get",
    });
    const result = httpResponse.body;

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: {
        const movies = (moviesFromJsonList(result?.Search) ?? []).map(
          (movie) => new MovieEntity(movie),
        );
        return new ListMoviesEntity({ movies });
      }
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}
