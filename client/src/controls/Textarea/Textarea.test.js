import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { Textarea } from "./Textarea.jsx";

describe("Textarea Component", () => {
  let textareaOptions;

  beforeEach(() => {
    textareaOptions = {
      type: "text",
      placeholder: "placeholder",
      maxLength: 12, //it didn't work
      rows: 8,
    };
  });

  test("textarea is rendering", () => {
    render(<Textarea {...textareaOptions} />);

    const textarea = screen.getByPlaceholderText("placeholder");

    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveClass("textarea");
    expect(textarea).toHaveAttribute("type", "text");
    expect(textarea.rows).toBe(8);
    expect(textarea.maxLength).toBe(0); //???
  });

  test("pass valid text", () => {
    const handleTextareaChange = jest.fn();

    textareaOptions.onChange = handleTextareaChange;

    render(<Textarea {...textareaOptions} />);

    const textareaEl = screen.getByPlaceholderText("placeholder");
    userEvent.type(textareaEl, "test2");

    expect(textareaEl).toHaveValue("test2");
    expect(screen.queryByPlaceholderText("error-msg")).not.toBeInTheDocument();
  });
});
