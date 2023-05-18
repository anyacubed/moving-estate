import React from "react";
import { render, screen } from "@testing-library/react";
import ContactInfoItem from "./ContactInfoItem.jsx";
import { ReactComponent as PhoneIcon } from "./assets/phone.svg";

describe("ContactInfoItem", () => {
  let contactProps;

  beforeEach(() => {
    contactProps = {
      isFooter: true,
      type: "phone",
    };
  });

  it("renders correctly", () => {
    const { container } = render(
      <ContactInfoItem {...contactProps}>123-456-789</ContactInfoItem>
    );

    expect(container.childElementCount).toEqual(1);
  });

  it("assigns correct classes", () => {
    const { container } = render(
      <ContactInfoItem {...contactProps}>123-456-789</ContactInfoItem>
    );

    const contactItemDiv = container.firstChild.firstChild;

    expect(contactItemDiv).toHaveClass("icon footer_icon");
  });

  it("renders correct icon", () => {
    const { container } = render(
      <ContactInfoItem {...contactProps}>123-456-789</ContactInfoItem>
    );
    const icon = container.firstChild.firstChild.firstChild;

    expect(icon).toBeInTheDocument();
    expect(icon.textContent).toEqual("phone.svg");
  });

  it("renders link correctly", () => {
    const { getByRole } = render(
      <ContactInfoItem {...contactProps}>123-456-789</ContactInfoItem>
    );
    const link = getByRole("link");

    expect(link).toBeInTheDocument();
    expect(link.textContent).toEqual("123-456-789");
    expect(link).toHaveAttribute("href", "tel:123-456-789");
  });
});
