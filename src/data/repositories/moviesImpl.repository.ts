import { Result } from "./../../../node_modules/@next/eslint-plugin-next/node_modules/glob/dist/commonjs/glob.d";
import {
  ListMoviesEntity,
  MovieEntity,
  MovieEntityType,
} from "@/domain/entities";
import { MoviesRepository } from "@/domain/repositories";
import { HttpClient, HttpStatusCode } from "../protocols/http";
import { Config } from "@/shared";
import {
  AccessDeniedError,
  NotFoundError,
  UnexpectedError,
} from "@/domain/errors";
import { movieFromJson, moviesFromJsonList } from "@/helpers";

export class MoviesRepositoryImpl implements MoviesRepository {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly url: string = Config.baseUrl;
  private readonly accessKey: string = Config.accessKey;

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
      case HttpStatusCode.ok:
        const movies = (moviesFromJsonList(result?.Search) ?? []).map(
          (movie) => new MovieEntity(movie),
        );
        return new ListMoviesEntity({ movies });

      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}
