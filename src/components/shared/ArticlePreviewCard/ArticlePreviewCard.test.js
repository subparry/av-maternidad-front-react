import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ArticlePreviewCard from "./";

const defaultBody =
  '[{"type":"text","value":"A previous version of this interface reached the Candidate Recommendation status. As some not-listed-at-risk features needed to be removed, the spec was demoted to the Working Draft level, explaining why browsers implemented this property unprefixed, though not at the CR state.A previous version of this interface reached the Candidate Recommendation status."}]';

describe("<ArticlePreviewCard />", () => {
  it("renders img thumbnail when post image present", () => {
    const { getByRole } = render(
      <ArticlePreviewCard
        body={defaultBody}
        thumbnailImg="https://images.unsplash.com/flagged/photo-1576523163697-795a7182b1b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
      />
    );
    expect(getByRole("img")).toBeInTheDocument();
  });

  it("displays article title", () => {
    const { getByRole } = render(
      <ArticlePreviewCard title="Cat's life" body={defaultBody} />
    );
    expect(getByRole("heading", { name: "Cat's life" })).toBeInTheDocument();
  });

  it("displays article's body truncated with an ellipsis", () => {
    const { container } = render(<ArticlePreviewCard body={defaultBody} />);

    expect(container.querySelector(".apcard-body p").textContent).toMatch(
      /A previous version.*\.\.\.$/
    );
  });
});
