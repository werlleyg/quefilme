import { MoviesRepositoryImpl } from "@/infrastructure/repositories";
import { MoviesRepository } from "@/domain/repositories";
import { makeAxiosHttpClient } from "../http/axiosHttpClient.factory";

export const makeMoviesRepository = (): MoviesRepository =>
  new MoviesRepositoryImpl(makeAxiosHttpClient());
