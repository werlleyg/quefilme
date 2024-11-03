import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Loader } from "@/presentation";
import React from "react";

describe("Loader Component", () => {
  test("Should render without crashing", () => {
    const { getByTestId } = render(<Loader />);
    const loaderElement = getByTestId("loader-id");
    expect(loaderElement).toBeInTheDocument();
  });
});
