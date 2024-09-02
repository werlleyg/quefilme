import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CardMoviesGrid } from "@/presentation";
import React from "react";

describe("CardMovieGrid Component", () => {
  it("Should render with multiple children", () => {
    const { getByTestId } = render(
      <CardMoviesGrid>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
        <div data-testid="child-3">Child 3</div>
      </CardMoviesGrid>,
    );
    expect(getByTestId("child-1")).toBeInTheDocument();
    expect(getByTestId("child-2")).toBeInTheDocument();
    expect(getByTestId("child-3")).toBeInTheDocument();
  });

  it("Should render the correct number of children", () => {
    const { getAllByTestId } = render(
      <CardMoviesGrid>
        <div>Child 1</div>
        <div>Child 2</div>
      </CardMoviesGrid>,
    );
    const items = getAllByTestId(/item-/);
    expect(items).toHaveLength(2);
  });

  it("Should render children in correct order", () => {
    const { getAllByTestId } = render(
      <CardMoviesGrid>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </CardMoviesGrid>,
    );
    const items = getAllByTestId(/item-/);
    expect(items[0]).toHaveTextContent("Child 1");
    expect(items[1]).toHaveTextContent("Child 2");
    expect(items[2]).toHaveTextContent("Child 3");
  });
});
