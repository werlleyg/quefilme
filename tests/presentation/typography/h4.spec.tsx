import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { H4 } from "@/presentation";
import React from "react";

describe("H4 Typography Component", () => {
  it("Should render the H4 component with children", () => {
    const { getByText } = render(<H4>Test Heading</H4>);
    const headingElement = getByText("Test Heading");
    expect(headingElement).toBeInTheDocument();
  });

  it("Should render multiple children correctly", () => {
    const { getByText } = render(
      <H4>
        <span>Child 1</span>
        <span>Child 2</span>
      </H4>,
    );
    expect(getByText("Child 1")).toBeInTheDocument();
    expect(getByText("Child 2")).toBeInTheDocument();
  });

  it("Should apply the correct HTML tag (h4)", () => {
    const { container } = render(<H4>Check Tag</H4>);
    const h4Element = container.querySelector("h4");
    expect(h4Element).toBeInTheDocument();
    expect(h4Element?.tagName).toBe("H4");
  });

  it("Should match the snapshot", () => {
    const { asFragment } = render(<H4>Snapshot Test</H4>);
    expect(asFragment()).toMatchSnapshot();
  });
});
