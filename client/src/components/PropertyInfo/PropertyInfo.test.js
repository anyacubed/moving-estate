import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PropertyInfo from "./PropertyInfo.jsx";

describe("PropertyInfo component", () => {
  let propertyInfoOptions;

  beforeEach(() => {
    propertyInfoOptions = {};
  });

  test("renders PropertyInfo list", () => {
    render(<PropertyInfo />);

    const list = screen.getByRole("list");

    expect(list).toBeInTheDocument();
  });

  test("renders PropertyInfo list items", () => {
    propertyInfoOptions.type = "townhouse";
    propertyInfoOptions.area = 1932;
    propertyInfoOptions.beds = 2;
    propertyInfoOptions.baths = 3;
    propertyInfoOptions.id = "A003N";

    render(<PropertyInfo {...propertyInfoOptions} />);

    expect(screen.getByText("townhouse")).toBeInTheDocument();
    expect(screen.queryByText("1932")).not.toBeInTheDocument();
    expect(screen.getByText("1932ft²")).toBeInTheDocument();
    expect(screen.getByText(2)).toBeInTheDocument();
    expect(screen.getByText(3)).toBeInTheDocument();
    expect(screen.queryByText("A003N")).not.toBeInTheDocument();
    expect(screen.getByText("ID: A003N")).toBeInTheDocument();
  });

  test("has correct classes", () => {
    propertyInfoOptions.isCentered = true;

    render(<PropertyInfo {...propertyInfoOptions} />);

    const list = screen.getByRole("list");

    expect(list).toHaveClass("list_centered");
  });
});
