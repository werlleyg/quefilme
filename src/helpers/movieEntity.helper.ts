import { MovieEntity } from "@/domain/entities";

export class MovieEntityHelper {
  static fromJson(data: any): MovieEntity {
    return {
      image: data.Poster,
      imdbID: data.imdbID,
      title: data.Title,
      type: data.Type,
      actors: data?.Actors,
      description: data?.Plot,
      genre: data?.Genre,
    };
  }

  static fromJsonList(dataList: any[]): MovieEntity[] {
    return dataList.map((data) => ({
      image: data.Poster,
      imdbID: data.imdbID,
      title: data.Title,
      type: data.Type,
      actors: data?.Actors,
      description: data?.Plot,
      genre: data?.Genre,
    }));
  }
}
