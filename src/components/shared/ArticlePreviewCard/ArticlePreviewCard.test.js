import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ArticlePreviewCard from "./";

describe("<ArticlePreviewCard />", () => {
  it("renders img thumbnail when post image present", () => {
    const { getByRole } = render(<ArticlePreviewCard />);
    expect(getByRole("img")).toBeInTheDocument();
  });

  it("displays article title", () => {
    const { getByRole } = render(<ArticlePreviewCard title="Cat's life" />);
    expect(getByRole("heading", { name: "Cat's life" })).toBeInTheDocument();
  });

  it("displays article's body truncated with an ellipsis", () => {
    const { container } = render(
      <ArticlePreviewCard
        body={`The horizontal offset (required) of the shadow, positive means the shadow will be on the right of the box, a negative offset will put the shadow on the left of the box.
    The vertical offset (required) of the shadow, a negative one means the box-shadow will be above the box, a positive one means the shadow will be below the box.
    The blur radius (required), if set to 0 the shadow will be sharp, the higher the number, the more blurred it will be, and the further out the shadow will extend. For instance a shadow with 5px of horizontal offset that also has a 5px blur radius will be 10px of total shadow.
    The spread radius (optional), positive values increase the size of the shadow, negative values decrease the size. Default is 0 (the shadow is same size as blur).`}
      />
    );

    expect(container.querySelector(".apcard-body p").textContent).toMatch(
      /The horizontal.*\.\.\.$/
    );
  });
});
