import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MovieCard } from "@/presentation";
import React from "react";

describe("MovieCard Component", () => {
  const mockProps = {
    title: "Inception",
    runtime: "2018",
    type: "movie",
    image: "/path/to/image.jpg",
    onClick: jest.fn(),
  };

  it("Should render all elements correctly", () => {
    const { getByRole, getByText } = render(<MovieCard {...mockProps} />);
    expect(getByRole("img", { name: mockProps.title })).toBeInTheDocument();
    expect(getByText(mockProps.title)).toBeInTheDocument();
    expect(getByText(`Ano ${mockProps.runtime}`)).toBeInTheDocument();
    expect(getByText("Filme")).toBeInTheDocument();
  });

  it("Should display the correct title", () => {
    const { getByText } = render(<MovieCard {...mockProps} />);
    expect(getByText("Inception")).toBeInTheDocument();
  });

  it("Should display the correct runtime", () => {
    const { getByText } = render(<MovieCard {...mockProps} />);
    expect(getByText("Ano 2018")).toBeInTheDocument();
  });

  it("Should display the correct type based on the type prop", () => {
    const { getByText } = render(<MovieCard {...mockProps} />);
    expect(getByText("Filme")).toBeInTheDocument();
  });

  it("Should display '-' when type is not found", () => {
    const { getByText } = render(
      <MovieCard {...mockProps} type="UnknownType" />,
    );
    expect(getByText("-")).toBeInTheDocument();
  });

  it("Should call onClick when the card is clicked", () => {
    const { getByRole } = render(<MovieCard {...mockProps} />);
    fireEvent.click(getByRole("img", { name: mockProps.title }));
    expect(mockProps.onClick).toHaveBeenCalled();
  });

  it("Should render correctly without runtime", () => {
    const { runtime, ...propsWithoutRuntime } = mockProps;
    const { queryByText } = render(<MovieCard {...propsWithoutRuntime} />);
    expect(queryByText(runtime)).not.toBeInTheDocument();
  });
});
