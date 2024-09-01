import { H4 } from "@/presentation/typography";
import { Badge, Image } from "../../atoms";
import { CustomCard } from "./styles";

export interface IMovieCard {
  title: string;
  runtime?: string;
  type: string;
  image: string;
  onClick: (e: unknown) => void;
}

function MovieCard({ image, runtime, title, type, onClick }: IMovieCard) {
  const _typeCard: Record<string, string> = {
    Movie: "Filme",
    Series: "Série",
  };

  return (
    <CustomCard onClick={onClick}>
      <Image
        aria-label={title}
        src={image}
        alt={title}
        width={"100%"}
        style={{
          aspectRatio: 78 / 104,
          objectFit: "cover",
          borderRadius: "4px",
        }}
      />
      <H4>{title}</H4>
      <H4>{runtime}</H4>
      <Badge>{_typeCard[type] ?? "-"}</Badge>
    </CustomCard>
  );
}

export { MovieCard };
