import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Image } from "@/presentation";
import React from "react";

describe("Image Component", () => {
  const kDefaultImageUrl = "/assets/images/default_image.png";

  it("Should render the image component", () => {
    const { getByRole } = render(<Image src="test.jpg" alt="Test Image" />);
    const imageElement = getByRole("img", { name: "Test Image" });
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "test.jpg");
  });

  it("Should set aria-label based on alt prop", () => {
    const { getByLabelText } = render(
      <Image src="test.jpg" alt="Accessible Image" />,
    );
    const imageElement = getByLabelText("Accessible Image");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("aria-label", "Accessible Image");
  });

  it("Should apply additional attributes", () => {
    const { getByRole } = render(
      <Image
        src="test.jpg"
        alt="Test Image"
        width={200}
        height={100}
        loading="lazy"
        className="custom-class"
      />,
    );
    const imageElement = getByRole("img", { name: "Test Image" });
    expect(imageElement).toHaveAttribute("src", "test.jpg");
    expect(imageElement).toHaveAttribute("width", "200");
    expect(imageElement).toHaveAttribute("height", "100");
    expect(imageElement).toHaveAttribute("loading", "lazy");
    expect(imageElement.className).toContain("custom-class");
  });

  it("Should fallback to default image when image fails to load", async () => {
    const { getByRole } = render(
      <Image src="invalid-image.jpg" alt="Test Image" />,
    );

    const imageElement = getByRole("img", { name: "Test Image" });
    expect(imageElement).toHaveAttribute("src", "invalid-image.jpg");

    fireEvent.error(imageElement);

    await waitFor(() => {
      expect(imageElement).toHaveAttribute("src", kDefaultImageUrl);
    });
  });

  it("Should use default image when no src is provided", () => {
    const { getByRole } = render(<Image alt="Test Image" />);

    const imageElement = getByRole("img", { name: "Test Image" });
    expect(imageElement).toHaveAttribute("src", kDefaultImageUrl);
  });

  it("Should handle multiple error events correctly", async () => {
    const { getByRole } = render(
      <Image src="invalid-image.jpg" alt="Test Image" />,
    );

    const imageElement = getByRole("img", { name: "Test Image" });

    // First error
    fireEvent.error(imageElement);
    await waitFor(() => {
      expect(imageElement).toHaveAttribute("src", kDefaultImageUrl);
    });

    // Second error should still maintain default image
    fireEvent.error(imageElement);
    await waitFor(() => {
      expect(imageElement).toHaveAttribute("src", kDefaultImageUrl);
    });
  });

  it("Should spread additional props to ImageCustom component", () => {
    const testId = "test-image";
    const { getByTestId } = render(
      <Image
        alt="Test Image"
        data-testid={testId}
        style={{ margin: "10px" }}
      />,
    );

    const imageElement = getByTestId(testId);
    expect(imageElement).toHaveAttribute(
      "style",
      expect.stringContaining("margin"),
    );
    expect(imageElement).toHaveAttribute("src", kDefaultImageUrl);
  });
});
