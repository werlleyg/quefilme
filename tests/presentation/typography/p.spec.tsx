import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { P } from "@/presentation";
import React from "react";

describe("P Typography Component", () => {
  test("Should render the P component with children", () => {
    const { getByText } = render(<P>Test Content</P>);
    expect(getByText("Test Content")).toBeInTheDocument();
  });

  test("Should apply HTML attributes to the Paragraph element", () => {
    const { getByText } = render(
      <P id="test-id" className="test-class">
        Test Content
      </P>,
    );
    const element = getByText("Test Content");

    expect(element).toHaveAttribute("id", "test-id");
    expect(element).toHaveClass("test-class");
  });

  test("Should render without children", () => {
    const { container } = render(<P />);
    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  test("Should apply inline styles to the Paragraph element", () => {
    const { getByText } = render(<P style={{ color: "red" }}>Styled Text</P>);
    const element = getByText("Styled Text");

    expect(element).toHaveStyle("color: red");
  });

  test("Should call onClick handler when clicked", () => {
    const handleClick = jest.fn();
    const { getByText } = render(<P onClick={handleClick}>Clickable Text</P>);

    fireEvent.click(getByText("Clickable Text"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("Should render children components correctly", () => {
    const ChildComponent = () => <span>Child Component</span>;

    const { getByText } = render(
      <P>
        <ChildComponent />
      </P>,
    );

    expect(getByText("Child Component")).toBeInTheDocument();
  });

  test("Should match the snapshot", () => {
    const { asFragment } = render(
      <P className="snapshot-test">Snapshot Content</P>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
