import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LinkButton } from "@/presentation";
import React from "react";

describe("LinkButton Component", () => {
  test("Should render without crashing", () => {
    const { getByRole } = render(<LinkButton>Click Me</LinkButton>);
    const button = getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it("should apply HTML button attributes correctly", () => {
    const { getByRole } = render(
      <LinkButton type="submit" disabled>
        Submit
      </LinkButton>,
    );
    const button = getByRole("button", { name: /submit/i });
    expect(button).toHaveAttribute("type", "submit");
    expect(button).toBeDisabled();
  });

  it("should handle click events", () => {
    const onClickMock = jest.fn();
    const { getByRole } = render(
      <LinkButton onClick={onClickMock}>Click Me</LinkButton>,
    );
    const button = getByRole("button", { name: /click me/i });

    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("should render with custom styles or classes", () => {
    const { getByRole } = render(
      <LinkButton className="custom-class">Styled Button</LinkButton>,
    );
    const button = getByRole("button", { name: /styled button/i });

    expect(button).toHaveClass("custom-class");
  });

  it("should render an icon or custom element as children", () => {
    const { getByTestId } = render(
      <LinkButton>
        <span data-testid="icon-element">Icon</span>
      </LinkButton>,
    );
    const icon = getByTestId("icon-element");
    expect(icon).toBeInTheDocument();
  });
});
