import React from "react";

import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import AdminSection from "./AdminSection";

// import NewArticleForm from "./NewArticleForm";

describe("Unauthenticated <AdminSection />", () => {
  it("shows admin login", () => {
    const { getByTestId } = render(<AdminSection />);
    expect(getByTestId("login-form")).toBeInTheDocument();
  });
});
