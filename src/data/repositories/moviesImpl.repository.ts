import { Result } from "./../../../node_modules/@next/eslint-plugin-next/node_modules/glob/dist/commonjs/glob.d";
import { MovieEntity } from "@/domain/entities";
import { MoviesRepository } from "@/domain/repositories";
import { HttpClient, HttpStatusCode } from "../protocols/http";
import { Config } from "@/shared";
import { AccessDeniedError, UnexpectedError } from "@/domain/errors";
import { MovieEntityHelper } from "@/helpers";

export class MoviesRepositoryImpl implements MoviesRepository {
  constructor(private readonly httpClient: HttpClient) {}

  private readonly url: string = Config.baseUrl;
  private readonly accessKey: string = Config.accessKey;

  async getMovie(imdbID: string): Promise<MovieEntity> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}?i=${imdbID}&apikey=${this.accessKey}`,
      method: "get",
    });

    const result = httpResponse.body;
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return MovieEntityHelper.fromJson(result);
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }

  async getMovieList(title: string): Promise<MovieEntity[]> {
    const httpResponse = await this.httpClient.request({
      url: `${this.url}?s=${title}&apikey=${this.accessKey}`,
      method: "get",
    });
    const result = httpResponse.body;
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return MovieEntityHelper.fromJsonList(result?.Search) ?? [];
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError();
      default:
        throw new UnexpectedError();
    }
  }
}
