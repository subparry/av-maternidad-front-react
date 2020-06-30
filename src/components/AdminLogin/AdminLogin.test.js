import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import AdminLogin from "./AdminLogin";
import { API_BASE_URL } from "../../support/constants";

const sampleEmail = "example@gmail.com";
describe("<AdminLogin />", () => {
  it("prompts for email and password", () => {
    const { getByRole, getByAltText } = render(<AdminLogin />);
    expect(
      getByRole("textbox", { name: "Ingrese su email" })
    ).toBeInTheDocument();
    expect(getByAltText("Ingrese su contraseña")).toBeInTheDocument();
  });

  it("displays typed email on email input", () => {
    const { getByRole } = render(<AdminLogin />);
    expect(getByRole("textbox", { name: "Ingrese su email" }).value).toBe("");
    typeEmail(getByRole);

    expect(getByRole("textbox", { name: "Ingrese su email" }).value).toBe(
      sampleEmail
    );
  });

  it("displays warning when trying to submit with empty fields", () => {
    const { getByRole, getByAltText, getByText, queryByText } = render(
      <AdminLogin />
    );

    submitForm(getByRole);

    expect(getByText("Debe ingresar un email")).toBeInTheDocument();

    typeEmail(getByRole);

    submitForm(getByRole);

    expect(getByText("Debe ingresar su contraseña")).toBeInTheDocument();
    getByAltText("Ingrese su contraseña").focus();
    typePassword(getByAltText);
    getByRole("textbox", { name: "Ingrese su email" }).focus();

    expect(queryByText("Debe ingresar su contraseña")).not.toBeInTheDocument();
  });

  it("submits form to backend on button click and stores token in localStorage", async () => {
    const { getByRole, getByAltText } = render(<AdminLogin />);
    const fetchSpy = jest.spyOn(window, "fetch");
    const setItemSpy = jest.spyOn(window.localStorage.__proto__, "setItem");
    typeEmail(getByRole);
    typePassword(getByAltText);
    submitForm(getByRole);
    const requestBody = { session: { email: sampleEmail, password: "123123" } };
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    expect(fetchSpy).toHaveBeenCalledWith(`${API_BASE_URL}/sign_in`, {
      method: "post",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await waitFor(() => {
      expect(setItemSpy).toHaveBeenCalledTimes(1);
    });
    expect(setItemSpy).toHaveBeenCalledWith(
      "access_token",
      window.localStorage.getItem("access_token")
    );
  });

  it("accessing with wrong credentials sets warning message", async () => {
    const { getByRole, getByAltText, queryByText } = render(<AdminLogin />);
    typeEmail(getByRole, "wrong@hotmail.com");
    typePassword(getByAltText);
    submitForm(getByRole);
    await waitFor(() => {
      expect(queryByText("Correo o contraseña erróneos")).toBeInTheDocument();
    });
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
