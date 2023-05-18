import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ListItem from "./ListItem.jsx";

describe("ListItem component", () => {
  let listItemOptions;

  beforeEach(() => {
    listItemOptions = {};
  });

  test("should not render ListItem component without info-prop provided", () => {
    listItemOptions.icon = "beds";

    render(<ListItem {...listItemOptions} />);

    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  test("should not render ListItem component with info-prop equal to undefined", () => {
    listItemOptions.info = "ID: undefined";

    render(<ListItem {...listItemOptions} />);

    expect(screen.queryByRole("listitem")).not.toBeInTheDocument();
  });

  test("renders ListItem component", () => {
    listItemOptions.info = "1932ft²";

    render(<ListItem {...listItemOptions} />);

    const listItem = screen.getByRole("listitem");

    expect(listItem).toBeInTheDocument();
  });

  test("has correct classes", () => {
    listItemOptions.info = "ID: A003N";
    listItemOptions.isCentered = true;

    render(<ListItem {...listItemOptions} />);

    const listItem = screen.getByRole("listitem");

    expect(listItem).toHaveClass("id_provided centered");
  });

  test("shows icon", () => {
    listItemOptions.info = "ID: A003N";
    listItemOptions.icon = "apartment";

    render(<ListItem {...listItemOptions} />);

    const icon = screen.getByText("apartment.svg");

    expect(icon).toBeInTheDocument();
  });

  test("should not show icon if icon-prop doesn't match cases", () => {
    listItemOptions.info = "ID: A003N";
    listItemOptions.icon = "test";

    render(<ListItem {...listItemOptions} />);

    const icon = screen.queryByText("test.svg");

    expect(icon).not.toBeInTheDocument();
  });
});
