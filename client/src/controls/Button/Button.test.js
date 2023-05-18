import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button.jsx";

describe("Button Component", () => {
  render(
    <Button
      type="submit"
      size="l"
      position="right"
      roundedLeft
      roundedRight
      disabled
    >
      Send message
    </Button>
  );

  const button = screen.getByText(/Send message/i);

  test("renders button", () => {
    expect(button).toBeInTheDocument();
  });

  test("has correct text", () => {
    expect(button).toHaveTextContent("Send message");
  });

  test("calls onClick prop when clicked", () => {
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>Send message</Button>);

    fireEvent.click(screen.getByText(/send message/i));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("has correct classes", () => {
    expect(button).toHaveClass(
      "rounded_left rounded_right large_button right_button"
    );
  });

  test("disabled is true", () => {
    expect(button).toBeDisabled();
  });
});
