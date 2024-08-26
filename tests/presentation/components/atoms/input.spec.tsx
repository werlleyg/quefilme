import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { IInput, Input } from "@/presentation";
import React from "react";

describe("Input Component", () => {
  test("Should load with default settings", () => {
    const defaultProps: IInput = {
      onChange: jest.fn(),
      placeholder: "Placeholder test",
    };

    const { getByPlaceholderText, getByTestId } = render(
      <Input {...defaultProps} />,
    );

    const input = getByPlaceholderText(defaultProps.placeholder!);

    expect(input).toBeInTheDocument();
  });

  test("Should be call onChange", async () => {
    const defaultProps: IInput = {
      onChange: jest.fn(),
      placeholder: "Placeholder test",
    };

    const { getByPlaceholderText } = render(<Input {...defaultProps} />);

    const input = getByPlaceholderText(defaultProps.placeholder!);

    fireEvent.change(input, { target: { value: "test" } });

    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);

    await waitFor(() => {
      expect(defaultProps.onChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "test" }),
        }),
      );
    });
  });
});
