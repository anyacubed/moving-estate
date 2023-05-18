import React from "react";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FloorPlans from "./FloorPlans.jsx";

describe("FloorPlans component", () => {
  let floorPlansOptions;

  beforeEach(() => {
    floorPlansOptions = {
      plans: [
        {
          name: "Ground Floor",
          url: "https://www.purelocations.com.au/wp-content/uploads/2022/05/Analise-Mornington_87201.jpg?v=1653962316",
        },
        {
          name: "1st Floor",
          url: "https://wpmedia.roomsketcher.com/content/uploads/2022/01/06145219/Floor-plan-with-dimensions.jpg",
        },
        {
          name: "2nd Floor",
          url: "https://i.stack.imgur.com/qDhl7.jpg",
        },
      ],
    };
  });

  test("renders FloorPlans component", () => {
    render(<FloorPlans {...floorPlansOptions} />);

    const floorPlansTitle = screen.getByText(/floor plans/i);
    const groundFloorImage = screen.getByAltText(/ground floor/i);
    const firstFloorButton = screen.getByText(/1st floor/i);
    const secondFloorButton = screen.getByText(/2nd floor/i);

    expect(floorPlansTitle).toBeInTheDocument();
    expect(groundFloorImage).toBeInTheDocument();
    expect(firstFloorButton).toBeInTheDocument();
    expect(secondFloorButton).toBeInTheDocument();
  });

  test("shows first image from plans array by default", () => {
    render(<FloorPlans {...floorPlansOptions} />);

    const groundFloorImage = screen.getByAltText(/ground floor/i);
    const firstFloorImage = screen.queryByAltText(/1st floor/i);
    const secondFloorImage = screen.queryByAltText(/2nd floor/i);

    expect(groundFloorImage).toBeInTheDocument();
    expect(firstFloorImage).not.toBeInTheDocument();
    expect(secondFloorImage).not.toBeInTheDocument();
  });

  test("changes image on button click", () => {
    render(<FloorPlans {...floorPlansOptions} />);

    const firstFloorButton = screen.getByText(/1st floor/i);

    userEvent.click(firstFloorButton);

    let firstFloorImage = screen.getByAltText(/1st floor/i);
    const groundFloorImage = screen.queryByAltText(/ground floor/i);
    let secondFloorImage = screen.queryByAltText(/2nd floor/i);

    expect(firstFloorImage).toBeInTheDocument();
    expect(groundFloorImage).not.toBeInTheDocument();
    expect(secondFloorImage).not.toBeInTheDocument();

    const secondFloorButton = screen.getByText(/2nd floor/i);

    userEvent.click(secondFloorButton);

    secondFloorImage = screen.getByAltText(/2nd floor/i);
    firstFloorImage = screen.queryByAltText(/1st floor/i);

    expect(secondFloorImage).toBeInTheDocument();
    expect(firstFloorImage).not.toBeInTheDocument();
    expect(groundFloorImage).not.toBeInTheDocument();
  });

  test("shows error image on error", () => {
    const { getByRole } = render(<FloorPlans {...floorPlansOptions} />);

    const image = getByRole("img");

    expect(image).toHaveAttribute(
      "src",
      "https://www.purelocations.com.au/wp-content/uploads/2022/05/Analise-Mornington_87201.jpg?v=1653962316"
    );

    fireEvent.error(image);

    expect(image).toHaveAttribute("src", "image_not_available.png");
  });
});
