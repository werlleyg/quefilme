import { MovieEntity, MovieEntityType } from "./movie.entity";

export type ListMoviesEntityType = {
  movies: MovieEntity[];
};

export class ListMoviesEntity {
  constructor(public props: ListMoviesEntityType) {}

  get movies(): MovieEntity[] {
    return this.props.movies;
  }

  get toJSON(): { movies: MovieEntityType[] } {
    return {
      movies: this.props.movies.map((movie) => ({
        image: movie.image,
        imdbID: movie.imdbID,
        title: movie.title,
        type: movie.type,
        actors: movie.actors,
        description: movie.description,
        genre: movie.genre,
        runtime: movie.runtime,
      })),
    };
  }

  public addMovie(movie: MovieEntity): void {
    this.props = {
      ...this.props,
      movies: [...this.props.movies, movie],
    };
  }

  public removeMovie(imdbID: string): void {
    this.props = {
      ...this.props,
      movies: this.props.movies.filter((movie) => movie.imdbID !== imdbID),
    };
  }

  public clear(): void {
    this.props = {
      ...this.props,
      movies: [],
    };
  }
}
