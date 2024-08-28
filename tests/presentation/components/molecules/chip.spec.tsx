import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Chip } from "@/presentation";
import React from "react";

jest.mock("../../../../../public/assets/icons/close.svg", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-close-icon" />,
}));

describe("Chip Component", () => {
  test("Should render the Chip component with children", () => {
    const { getByText } = render(<Chip>Test Chip</Chip>);
    const chipElement = getByText("Test Chip");
    expect(chipElement).toBeInTheDocument();
  });

  test("Should not render IconButton when onClick is not provided", () => {
    const { queryByRole } = render(<Chip>Test Chip</Chip>);
    const iconButton = queryByRole("button");
    expect(iconButton).not.toBeInTheDocument();
  });

  test("Should render IconButton when onClick is provided", () => {
    const { getByRole, getByTestId } = render(
      <Chip onClick={() => {}}>Test Chip</Chip>,
    );
    const iconButton = getByRole("button");
    expect(iconButton).toBeInTheDocument();
    const iconButtonByIcon = getByTestId("mock-close-icon");
    expect(iconButtonByIcon).toBeInTheDocument();
  });

  test("Should call onClick when IconButton is clicked", () => {
    const handleClick = jest.fn();
    const { getByRole } = render(<Chip onClick={handleClick}>Test Chip</Chip>);
    const iconButton = getByRole("button");
    fireEvent.click(iconButton);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("Should only render IconButton when onClick is passed", () => {
    const { rerender, queryByRole, getByRole } = render(<Chip>Test Chip</Chip>);
    let iconButton = queryByRole("button");
    expect(iconButton).not.toBeInTheDocument();

    rerender(<Chip onClick={() => {}}>Test Chip</Chip>);
    iconButton = getByRole("button");
    expect(iconButton).toBeInTheDocument();
  });
});
