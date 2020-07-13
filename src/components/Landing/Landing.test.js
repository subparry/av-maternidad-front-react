import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { APP_NAME, API_BASE_URL } from "../../support/constants";

import React from "react";
import Header from "./Header";
import Quote from "./Quote";
import RecentArticles from "./RecentArticles";

describe("<Header />", () => {
  it("Contains h1 with app title", () => {
    const { getByRole } = render(<Header />);
    const headingElement = getByRole("heading", { name: APP_NAME });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName.toLowerCase()).toBe("h1");
  });

  it("Has full width background image", () => {
    const { getByTestId } = render(<Header />);
    const sectionElement = getByTestId("header-section");
    expect(sectionElement.classList.contains("header-background")).toBe(true);
  });

  it("has h2 subtitle", () => {
    const { getAllByRole } = render(<Header />);
    const headings = getAllByRole("heading");
    expect(headings.some((ele) => ele.tagName.toLowerCase() === "h2")).toBe(
      true
    );
  });

  it("matches snapshot", () => {
    const { container } = render(<Header />);

    expect(container.firstElementChild).toMatchSnapshot();
  });
});

describe("<Quote />", () => {
  it("has some meaningful quote", () => {
    const { container } = render(<Quote />);
    expect(container.querySelector("p").textContent.length).toBeGreaterThan(10);
  });

  it("matches snapshot", () => {
    const { container } = render(<Quote />);
    expect(container.firstElementChild).toMatchSnapshot();
  });
});

describe("<RecentArticles />", () => {
  it("requests recent articles to api", () => {
    const mockFetch = jest.spyOn(window, "fetch");
    render(<RecentArticles />);
    waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    expect(mockFetch).toHaveBeenCalledWith(
      `${API_BASE_URL}/recent_posts`,
      expect.anything()
    );
  });

  it("renders <Slider /> component", () => {
    const { container } = render(<RecentArticles />);

    expect(
      container.querySelector(".apa-slider-container")
    ).toBeInTheDocument();
  });
});
