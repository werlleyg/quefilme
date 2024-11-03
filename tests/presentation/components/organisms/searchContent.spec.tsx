import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SearchContent, ISearchContent } from "@/presentation";
import { ListMoviesEntity } from "@/domain/entities";
import { movieMock } from "./mocks/searchContent.mock";

jest.mock("../../../../../public/assets/icons/search.svg", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-search-icon" />,
}));

describe("SearchContent Component", () => {
  const mockHandleChangeInput = jest.fn();
  const mockOnSelect = jest.fn();
  const mockMovies = new ListMoviesEntity({ movies: [movieMock] });

  const defaultProps: ISearchContent = {
    handleChangeInput: mockHandleChangeInput,
    value: "test",
    movies: mockMovies,
    onSelect: mockOnSelect,
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

  it("Should render FullScreenModal when value is provided", () => {
    const { getByText } = render(<SearchContent {...defaultProps} />);
    expect(getByText("Selecione o filme abaixo")).toBeInTheDocument();
  });

  it("Should not render FullScreenModal when value is not provided", () => {
    const { queryByText } = render(
      <SearchContent {...defaultProps} value={undefined} />,
    );
    expect(queryByText("Selecione o filme abaixo")).not.toBeInTheDocument();
  });

  it("Should render SearchInput with correct props", () => {
    const { getByPlaceholderText } = render(
      <SearchContent {...defaultProps} />,
    );
    expect(
      getByPlaceholderText("Digite o filme que você gosta ..."),
    ).toBeInTheDocument();
  });

  it("Should call handleChangeInput on SearchInput change", () => {
    jest.useFakeTimers();

    const { getByPlaceholderText } = render(
      <SearchContent {...defaultProps} />,
    );
    fireEvent.change(
      getByPlaceholderText("Digite o filme que você gosta ..."),
      {
        target: { value: "new movie" },
      },
    );

    jest.advanceTimersByTime(2000);

    expect(mockHandleChangeInput).toHaveBeenCalledWith("new movie");

    jest.useRealTimers();
  });

  it("Should render movie cards when movies are provided", () => {
    const { getByText } = render(<SearchContent {...defaultProps} />);
    expect(getByText(movieMock.title)).toBeInTheDocument();
  });

  it("Should call onSelect and reset the form when a movie is selected", () => {
    const { getByText } = render(<SearchContent {...defaultProps} />);
    fireEvent.click(getByText(movieMock.title));
    expect(mockOnSelect).toHaveBeenCalledWith(movieMock);
  });
});
