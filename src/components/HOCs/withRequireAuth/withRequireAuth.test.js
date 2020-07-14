import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
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
    localStorage.removeItem("access_token");
    expect(queryByTestId("sample-component")).not.toBeInTheDocument();
    expect(queryByTestId("login-form")).toBeInTheDocument();
  });

  it("after authenticating renders intended component normally", async () => {
    const { queryByTestId } = setup();
    typeEmail();
    typePassword();
    submitForm();
    await waitFor(() => {
      expect(queryByTestId("sample-component")).toBeInTheDocument();
    });
    expect(queryByTestId("login-form")).not.toBeInTheDocument();
  });

  it("with expired or invalid token in localStorage, renders login form", async () => {
    localStorage.setItem("access_token", "some_invalid_jibberish");
    setup();
    await waitFor(() => {
      expect(screen.queryByTestId("sample-component")).not.toBeInTheDocument();
    });
  });
});

function typeEmail(mail = sampleEmail) {
  userEvent.type(
    screen.getByRole("textbox", { name: "Ingrese su email" }),
    mail
  );
}

function submitForm() {
  userEvent.click(screen.getByRole("button", { name: "Ingresar" }));
}

function typePassword() {
  userEvent.type(screen.getByAltText("Ingrese su contraseña"), "123123");
}
