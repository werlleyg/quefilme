import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { IButton, Button } from "@/presentation";
import React from "react";

describe("Button Component", () => {
  test("Should render children correctly", () => {
    const { getByText } = render(<Button>Click Me</Button>);
    const buttonElement = getByText("Click Me");
    expect(buttonElement).toBeInTheDocument();
  });

  test("Should not render icon when not provided", () => {
    const { queryByTestId } = render(<Button>Click Me</Button>);
    const iconElement = queryByTestId("icon-mock");
    expect(iconElement).not.toBeInTheDocument();
  });

  test("Should applies fullWidth prop correctly", () => {
    const { getByText } = render(<Button fullWidth>Click Me</Button>);
    const buttonElement = getByText("Click Me");
    expect(buttonElement).toHaveStyle({ width: "100%" });
  });

  test("Should calls onClick when clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click Me</Button>,
    );
    const buttonElement = getByText("Click Me");

    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("Should renders with default props", () => {
    const { getByText } = render(<Button>Click Me</Button>);
    const buttonElement = getByText("Click Me");

    expect(buttonElement).not.toHaveStyle({ width: "100%" });
  });
});
