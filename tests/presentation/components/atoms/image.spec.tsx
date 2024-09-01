import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Image } from "@/presentation";
import React from "react";

describe("Image Component", () => {
  it("Should render the image component", () => {
    const { getByRole } = render(<Image src="test.jpg" alt="Test Image" />);
    const imageElement = getByRole("img", { name: "Test Image" });
    expect(imageElement).toBeInTheDocument();
  });

  it("Should set aria-label based on alt prop", () => {
    const { getByLabelText } = render(
      <Image src="test.jpg" alt="Accessible Image" />,
    );
    const imageElement = getByLabelText("Accessible Image");
    expect(imageElement).toBeInTheDocument();
  });

  it("Should apply additional attributes", () => {
    const { getByRole } = render(
      <Image
        src="test.jpg"
        alt="Test Image"
        width={200}
        height={100}
        loading="lazy"
      />,
    );
    const imageElement = getByRole("img", { name: "Test Image" });
    expect(imageElement).toHaveAttribute("src", "test.jpg");
    expect(imageElement).toHaveAttribute("width", "200");
    expect(imageElement).toHaveAttribute("height", "100");
    expect(imageElement).toHaveAttribute("loading", "lazy");
  });
});
