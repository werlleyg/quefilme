import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoadingContent } from "@/presentation";
import React from "react";

describe("LoadingContent Component", () => {
  it("should render LoadingContent without crashing", () => {
    const { getByTestId } = render(<LoadingContent />);
    const container = getByTestId("loading-container");
    expect(container).toBeInTheDocument();
  });

  it("should render Loader component", () => {
    const { getByTestId } = render(<LoadingContent />);
    const loader = getByTestId("loader-id");
    expect(loader).toBeInTheDocument();
  });

  it("should render P component with correct text", () => {
    const { getByText } = render(<LoadingContent />);
    const paragraph = getByText(/Aguarde enquanto estamos/i);
    expect(paragraph).toBeInTheDocument();
    expect(paragraph).toContainHTML("<b>capturando</b>");
  });

  it("should apply correct styles to the P component", () => {
    const { getByText } = render(<LoadingContent />);
    const paragraph = getByText(/Aguarde enquanto estamos/i);
    expect(paragraph).toHaveStyle({
      width: "min(100% - 1rem, 350px)",
      textAlign: "center",
      fontWeight: "200",
    });
  });

  it("should render Container as a flex container", () => {
    const { getByTestId } = render(<LoadingContent />);
    const container = getByTestId("loading-container");
    expect(container).toHaveStyle({
      display: "flex",
    });
  });
});
