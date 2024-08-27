import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Badge } from "@/presentation";
import React from "react";

describe("Badge Component", () => {
  test("Should render without crashing", () => {
    const { getByText } = render(<Badge>Test Badge</Badge>);
    const badgeElement = getByText("Test Badge");
    expect(badgeElement).toBeInTheDocument();
  });

  test("Should render text children correctly", () => {
    const { getByText } = render(<Badge>Badge Text</Badge>);
    const badgeElement = getByText("Badge Text");
    expect(badgeElement).toBeInTheDocument();
  });

  test("Should render HTML element as children correctly", () => {
    const { getByText } = render(
      <Badge>
        <span>Badge HTML Element</span>
      </Badge>,
    );
    const badgeElement = getByText("Badge HTML Element");
    expect(badgeElement.tagName).toBe("SPAN");
  });

  test("Should render React component as children correctly", () => {
    const ChildComponent = () => <div>Child Component</div>;
    const { getByText } = render(
      <Badge>
        <ChildComponent />
      </Badge>,
    );
    const badgeElement = getByText("Child Component");
    expect(badgeElement).toBeInTheDocument();
  });

  test("Should render dynamic content correctly", () => {
    const { rerender, getByText } = render(<Badge>Initial Content</Badge>);
    const badgeElement = getByText("Initial Content");
    expect(badgeElement).toBeInTheDocument();

    rerender(<Badge>Updated Content</Badge>);
    const updatedBadgeElement = getByText("Updated Content");
    expect(updatedBadgeElement).toBeInTheDocument();
  });
});
