import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import withRequireAuth from "./withRequireAuth";
const sampleEmail = "example@gmail.com";

const SampleComponent = () => {
  return <div data-testid="sample-component" />;
};

const setup = () => {
  const Wrapped = withRequireAuth(SampleComponent);
  return render(<Wrapped />);
};

describe("withRequireAuth", () => {
  it("without access_token in localStorage, it renders login form", () => {
    const { queryByTestId } = setup();
    expect(queryByTestId("sample-component")).not.toBeInTheDocument();
    expect(queryByTestId("login-form")).toBeInTheDocument();
  });

  it("after authenticating renders intended component normally", async () => {
    const { queryByTestId, getByRole, getByAltText } = setup();
    typeEmail(getByRole);
    typePassword(getByAltText);
    submitForm(getByRole);
    await waitFor(() => {
      expect(queryByTestId("sample-component")).toBeInTheDocument();
    });
    expect(queryByTestId("login-form")).not.toBeInTheDocument();
  });
});

function typeEmail(getByRole, mail = sampleEmail) {
  userEvent.type(getByRole("textbox", { name: "Ingrese su email" }), mail);
}

function submitForm(getByRole) {
  userEvent.click(getByRole("button", { name: "Ingresar" }));
}

function typePassword(getByAltText) {
  userEvent.type(getByAltText("Ingrese su contraseña"), "123123");
}
