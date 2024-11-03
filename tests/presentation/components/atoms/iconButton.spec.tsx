import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { IconButton } from "@/presentation";
import React from "react";

describe("IconButton Component", () => {
  test("Should render children correctly", () => {
    const { getByText } = render(<IconButton>Icon</IconButton>);
    const buttonElement = getByText("Icon");
    expect(buttonElement).toBeInTheDocument();
  });

  test("Should apply default props to the IconButton", () => {
    const { getByRole } = render(
      <IconButton type="submit" disabled>
        Icon
      </IconButton>,
    );
    const buttonElement = getByRole("button");
    expect(buttonElement).toHaveAttribute("type", "submit");
    expect(buttonElement).toBeDisabled();
  });

  test("Should trigger onClick event when IconButton is clicked", () => {
    const handleClick = jest.fn();
    const { getByRole } = render(
      <IconButton onClick={handleClick}>Icon</IconButton>,
    );
    const buttonElement = getByRole("button");
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("Should focus on the IconButton and apply aria-label correctly", () => {
    const { getByRole } = render(
      <IconButton aria-label="My Icon Button">Icon</IconButton>,
    );
    const buttonElement = getByRole("button");
    expect(buttonElement).toHaveAttribute("aria-label", "My Icon Button");
    buttonElement.focus();
    expect(buttonElement).toHaveFocus();
  });
});
