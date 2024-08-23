import { fireEvent, render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ISearchInput, SearchInput } from "@/presentation";
import React from "react";

jest.mock("../../../../../public/assets/icons/search.svg", () => ({
  __esModule: true,
  default: () => <div data-testid="mock-search-icon" />,
}));

describe("Search Input Component", () => {
  test("Should load with default settings", () => {
    const defaultProps: ISearchInput = {
      onChange: jest.fn(),
      placeholder: "Placeholder test",
    };

    const { getByPlaceholderText, getByTestId } = render(
      <SearchInput {...defaultProps} />,
    );

    const input = getByPlaceholderText(defaultProps.placeholder!);
    const searchIcon = getByTestId("mock-search-icon");

    expect(input).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });

  test("Should be call onChange with debounce", async () => {
    jest.useFakeTimers();

    const defaultProps: ISearchInput = {
      onChange: jest.fn(),
      placeholder: "Placeholder test",
      debounce: 2,
    };

    const { getByPlaceholderText, getByTestId } = render(
      <SearchInput {...defaultProps} />,
    );

    const input = getByPlaceholderText(defaultProps.placeholder!);

    fireEvent.change(input, { target: { value: "test" } });

    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(defaultProps.onChange).not.toHaveBeenCalled();
    });

    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(defaultProps.onChange).toHaveBeenCalledWith("test");
    });

    jest.useRealTimers();
  });
});
