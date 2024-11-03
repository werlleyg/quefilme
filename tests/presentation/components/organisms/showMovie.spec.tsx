// ShowMovie.test.tsx

import { render, fireEvent } from "@testing-library/react";
import { ShowMovie, IShowMovie } from "@/presentation/components";
import { movieMock } from "./mocks/searchContent.mock";

jest.mock("../../../../../public/assets/icons/puzzle.svg", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-puzzle-icon" />,
}));

describe("ShowMovie component", () => {
  const onChangeAnotherMovie = jest.fn();
  const goBack = jest.fn();

  const defaultProps: IShowMovie = {
    movie: movieMock,
    onChangeAnotherMovie,
    goBack,
  };

  beforeEach(() => {
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.width = "";
    document.body.style.paddingRight = "";
    window.scrollTo = jest.fn();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should render FullScreenModal when movie is provided", () => {
    const { getByText } = render(<ShowMovie {...defaultProps} />);
    expect(getByText(/aí está!/i)).toBeInTheDocument();
  });

  it("should render MovieCard with the correct movie title", () => {
    const { getByText } = render(<ShowMovie {...defaultProps} />);
    expect(getByText(movieMock.title)).toBeInTheDocument();
  });

  it("should display the PMessage text", () => {
    const { getByText } = render(<ShowMovie {...defaultProps} />);
    expect(
      getByText(/baseado nas suas escolhas, achamos o filme perfeito/i),
    ).toBeInTheDocument();
  });

  it("should call onChangeAnotherMovie when 'Sugerir outro' button is clicked", () => {
    const { getByRole } = render(<ShowMovie {...defaultProps} />);
    const suggestAnotherButton = getByRole("button", {
      name: /sugerir outro/i,
    });
    fireEvent.click(suggestAnotherButton);
    expect(onChangeAnotherMovie).toHaveBeenCalledTimes(1);
  });

  it("should call goBack when 'Voltar' button is clicked", () => {
    const { getByRole } = render(<ShowMovie {...defaultProps} />);
    const backButton = getByRole("button", { name: /voltar/i });
    fireEvent.click(backButton);
    expect(goBack).toHaveBeenCalledTimes(1);
  });

  it("should not render anything if movie is not provided", () => {
    const { queryByText } = render(
      <ShowMovie onChangeAnotherMovie={onChangeAnotherMovie} goBack={goBack} />,
    );
    expect(queryByText(/aí está!/i)).not.toBeInTheDocument();
  });
});
