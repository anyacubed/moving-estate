import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dropdown } from "./Dropdown.jsx";

const options = ["cat", "dog", "parrot"];

describe("Dropdown component", () => {
  let dropdownOptions;

  beforeEach(() => {
    dropdownOptions = {
      options: options.map((item) => {
        return {
          value: item,
          label: item,
        };
      }),
    };
  });

  test("renders dropdown", () => {
    render(<Dropdown />);

    const dropdown = screen.getByRole("combobox");

    expect(dropdown).toBeInTheDocument();
  });

  test("shows options", () => {
    render(<Dropdown {...dropdownOptions} />);

    const dropdown = screen.getByRole("combobox");

    userEvent.click(dropdown);

    expect(screen.getByText("parrot")).toBeInTheDocument();
    expect(screen.getByText("cat")).toBeInTheDocument();
    expect(screen.getByText("dog")).toBeInTheDocument();
  });

  test("calls onChange prop when clicked", async () => {
    const handleChange = jest.fn();

    dropdownOptions.onChange = handleChange;

    render(<Dropdown {...dropdownOptions} />);

    const dropdown = screen.getByRole("combobox");

    userEvent.click(dropdown);

    const option = screen.getByText("parrot");

    userEvent.click(option);

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("selects a specific option", () => {
    const handleChange = jest.fn();

    dropdownOptions.onChange = handleChange;

    render(<Dropdown {...dropdownOptions} />);

    const dropdown = screen.getByRole("combobox");

    userEvent.click(dropdown);

    const option = screen.getByText("parrot");

    userEvent.click(option);

    expect(screen.getByText("parrot")).toBeInTheDocument();
    expect(screen.queryByText("cat")).not.toBeInTheDocument();
    expect(screen.queryByText("dog")).not.toBeInTheDocument();
  });

  test("has placeholder text", () => {
    dropdownOptions.placeholder = "Type";

    render(<Dropdown {...dropdownOptions} />);

    expect(screen.getByText(/type/i)).toBeInTheDocument();
    expect(screen.queryByText("cat")).not.toBeInTheDocument();
    expect(screen.queryByText("dog")).not.toBeInTheDocument();
    expect(screen.queryByText("parrot")).not.toBeInTheDocument();
  });

  test("has default value over placeholder text", () => {
    dropdownOptions.placeholder = "Type";
    dropdownOptions.value = "cat";

    render(<Dropdown {...dropdownOptions} />);

    expect(screen.getByText("cat")).toBeInTheDocument();
    expect(screen.queryByText("dog")).not.toBeInTheDocument();
    expect(screen.queryByText("parrot")).not.toBeInTheDocument();
    expect(screen.queryByText(/type/i)).not.toBeInTheDocument();
  });

  test("has correct classes", () => {
    dropdownOptions.width = "half";

    const { container } = render(<Dropdown {...dropdownOptions} />);

    const dropdown = container.firstChild;

    expect(dropdown).toHaveClass("select select_half");
  });
});
