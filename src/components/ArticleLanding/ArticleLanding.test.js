import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import { APP_NAME, API_BASE_URL } from "../../support/constants";
import Header from "./Header";
import React from "react";

describe("<Header />", () => {
  it("Contains h1 with article title", () => {
    render(<Header title="Cómo lograr un buen acople" />);
    const title = screen.queryByText("Cómo lograr un buen acople");
    expect(title).toBeInTheDocument();
    expect(title.tagName.toLowerCase()).toBe("h1");
  });

  it("displays main image", () => {
    render(
      <Header
        title="Cómo lograr un buen acople"
        imageUrl="https://images.unsplash.com/flagged/photo-1576523163697-795a7182b1b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
      />
    );
    const mainImage = screen.queryByRole("img", {
      name: /article main image/i,
    });
    expect(mainImage).toBeInTheDocument();
  });
});
