import { ReactNode } from "react";
import { Container, Item } from "./styles";

export interface ICardMovieGrid {
  children?: ReactNode[];
}

function CardMoviesGrid({ children }: ICardMovieGrid) {
  return (
    <Container>
      {children?.map((child, idx) => (
        <Item key={idx} data-testid={`item-${idx}`}>
          {child}
        </Item>
      ))}
    </Container>
  );
}

export { CardMoviesGrid };
