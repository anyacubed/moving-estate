import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Title from "./Title.jsx";

describe("Input Component", () => {
  let titleOptions;

  beforeEach(() => {
    titleOptions = {
      location: ["Wroclaw", "Poland"],
      name: "title",
    };
  });

  test("name Rendering", () => {
    render(<Title {...titleOptions} />);

    const name = screen.getByText(/title/i);
    expect(name).toBeInTheDocument();
    expect(name).toHaveClass("property_title");
  });

  test("location Rendering", () => {
    render(<Title {...titleOptions} />);

    const location = screen.getByText(/Wroclaw/i);
    expect(location).toBeInTheDocument();
    expect(location).toHaveClass("property_city_area");
    expect(location).toHaveTextContent("Wroclaw, Poland");
  });
});
