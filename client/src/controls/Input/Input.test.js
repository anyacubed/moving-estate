import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { Input } from "./Input.jsx";

describe("Input Component", () => {
  let inputOptions;

  beforeEach(() => {
    inputOptions = {
      type: "text",
      placeholder: "Min. Area",
      width: "half",
      value: "cat",
    };
  });

  test("input Rendering", () => {
    render(<Input {...inputOptions} />);

    const input = screen.getByPlaceholderText(/Min. Area/i);
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass("input_field input_field_half");
    expect(input).toHaveAttribute("type", "text");
  });

  test("pass valid text", () => {
    render(<Input {...inputOptions} />);

    const inputEl = screen.getByPlaceholderText(/Min. Area/i);
    userEvent.type(inputEl, "test");

    expect(inputEl).toHaveValue("cattest");
    expect(screen.queryByPlaceholderText("error-msg")).not.toBeInTheDocument();
  });
});
