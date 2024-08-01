export type MovieEntityType = {
  title: string;
  imdbID: string;
  type: string;
  image: string;
  runtime?: string;
  genre?: string;
  actors?: string;
  description?: string;
};

export class MovieEntity {
  constructor(public props: MovieEntityType) {}

  get title(): string {
    return this.props.title;
  }

  get imdbID(): string {
    return this.props.imdbID;
  }

  get type(): string {
    return this.props.type;
  }

  get image(): string {
    return this.props.image;
  }

  get runtime(): string {
    return this.props.runtime ?? "";
  }

  get genre(): string {
    return this.props.genre ?? "";
  }

  get actors(): string {
    return this.props.actors ?? "";
  }

  get description(): string {
    return this.props.description ?? "";
  }

  get toJSON(): MovieEntityType {
    return {
      image: this.props.image,
      imdbID: this.props.imdbID,
      title: this.props.title,
      type: this.props.type,
      actors: this.props.actors,
      description: this.props.description,
      genre: this.props.genre,
      runtime: this.props.runtime,
    };
  }
}
