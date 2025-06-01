import { H3, H4 } from "@/presentation/typography";
import { Badge, Image } from "../../atoms";
import { CustomCard } from "./styles";

export interface IMovieCard {
  title: string;
  runtime?: string;
  type: string;
  image: string;
  onClick: (e: unknown) => void;
  align?: "left" | "center";
}

function MovieCard({
  image,
  runtime,
  title,
  type,
  onClick,
  align = "left",
}: IMovieCard) {
  const _typeCard: Record<string, string> = {
    movie: "Filme",
    series: "Série",
  };

  return (
    <CustomCard onClick={onClick} align={align}>
      <Image
        key={title}
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
      <H3>{title}</H3>
      <H4>Ano {runtime}</H4>
      <Badge>{_typeCard[type] ?? "-"}</Badge>
    </CustomCard>
  );
}

export { MovieCard };
