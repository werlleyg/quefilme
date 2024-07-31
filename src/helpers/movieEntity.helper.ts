import { MovieEntityType } from "@/domain/entities";

export class MovieEntityHelper {
  static fromJson(data: any): MovieEntityType {
    return {
      image: data.Poster,
      imdbID: data.imdbID,
      title: data.Title,
      type: data.Type,
      actors: data?.Actors,
      description: data?.Plot,
      genre: data?.Genre,
      runtime: data?.Runtime,
    };
  }

  static fromJsonList(dataList: any[]): MovieEntityType[] {
    if (!dataList) return [];

    return dataList.map((data) => ({
      image: data.Poster,
      imdbID: data.imdbID,
      title: data.Title,
      type: data.Type,
      actors: data?.Actors,
      description: data?.Plot,
      genre: data?.Genre,
      runtime: data?.Runtime,
    }));
  }
}
