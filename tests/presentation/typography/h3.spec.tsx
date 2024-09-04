import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { H3 } from "@/presentation";
import React from "react";

describe("H3 Typography Component", () => {
  it("Should render the H3 component with children", () => {
    const { getByText } = render(<H3>Test Heading</H3>);
    const headingElement = getByText("Test Heading");
    expect(headingElement).toBeInTheDocument();
  });

  it("Should render multiple children correctly", () => {
    const { getByText } = render(
      <H3>
        <span>Child 1</span>
        <span>Child 2</span>
      </H3>,
    );
    expect(getByText("Child 1")).toBeInTheDocument();
    expect(getByText("Child 2")).toBeInTheDocument();
  });

  it("Should apply the correct HTML tag (H3)", () => {
    const { container } = render(<H3>Check Tag</H3>);
    const H3Element = container.querySelector("h3");
    expect(H3Element).toBeInTheDocument();
    expect(H3Element?.tagName).toBe("H3");
  });

  it("Should match the snapshot", () => {
    const { asFragment } = render(<H3>Snapshot Test</H3>);
    expect(asFragment()).toMatchSnapshot();
  });
});
