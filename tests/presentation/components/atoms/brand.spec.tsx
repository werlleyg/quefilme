import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Brand } from "@/presentation";
import React from "react";

jest.mock("../../../../../public/assets/icons/brand.svg", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-brand-icon" />,
}));

describe("Brand Component", () => {
  test("Should render without crashing", () => {
    const { getByTestId } = render(<Brand />);
    const brandElement = getByTestId("mock-brand-icon");
    expect(brandElement).toBeInTheDocument();
  });
});
