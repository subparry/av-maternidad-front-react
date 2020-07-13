import React from "react";

import {
  render,
  fireEvent,
  waitFor,
  screen,
  waitForElementToBeRemoved,
  waitForDomChange,
} from "@testing-library/react";
import AdminSection from "./AdminSection";
import NewArticleForm from "./NewArticleForm";
import userEvent from "@testing-library/user-event";
import { API_BASE_URL } from "../../support/constants";

describe("Unauthenticated <AdminSection />", () => {
  it("shows admin login", () => {
    render(<AdminSection />);
    expect(screen.getByTestId("login-form")).toBeInTheDocument();
  });
});

describe("Authenticated <AdminSection />", () => {
  it("renders admin section", () => {
    window.localStorage.setItem("access_token", "test");
    render(<AdminSection />);
    expect(screen.queryByTestId("admin-section")).toBeInTheDocument();
  });
});

const newArticleSetup = async () => {
  await render(<NewArticleForm />);
  const enterValue = (value) => {
    if (!value) return;
    const addedFields = screen.getAllByTestId("added-field");
    userEvent.type(addedFields[addedFields.length - 1], value);
  };
  const addText = (value) => {
    userEvent.selectOptions(
      screen.getByTestId("new-field-type-selector"),
      "text"
    );
    userEvent.click(screen.getByRole("button", { name: "Agregar" }));
    enterValue(value);
  };

  const addImage = (value) => {
    userEvent.selectOptions(
      screen.getByTestId("new-field-type-selector"),
      "image"
    );
    userEvent.click(screen.getByRole("button", { name: "Agregar" }));
    enterValue(value);
  };

  const addQuote = (value) => {
    userEvent.selectOptions(
      screen.getByTestId("new-field-type-selector"),
      "quote"
    );
    userEvent.click(screen.getByRole("button", { name: "Agregar" }));
    enterValue(value);
  };

  const createPost = () => {
    userEvent.click(screen.getByRole("button", { name: "Guardar" }));
  };
  return { addText, addImage, addQuote, createPost };
};

describe("<NewArticleForm />", () => {
  it("renders form with title and image url fields initially", async () => {
    await newArticleSetup();
    expect(
      screen.queryByRole("textbox", { name: "Ingrese el título del artículo" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("textbox", {
        name: "Ingrese la url de la imagen principal del artículo",
      })
    ).toBeInTheDocument();
  });

  it("has dropdown with options for adding more sections and default value of 'Sección de texto'", async () => {
    await newArticleSetup();
    expect(screen.getByDisplayValue("Sección de texto")).toBeInTheDocument();
  });

  it("adds new textarea when selecting 'Sección de texto' and clicking 'Agregar' button", async () => {
    const { addText } = await newArticleSetup();
    expect(
      screen.queryByRole("textbox", { name: /ingrese el texto de la sección/i })
    ).not.toBeInTheDocument();
    addText();
    expect(
      screen.queryByRole("textbox", { name: /ingrese el texto de la sección/i })
    ).toBeInTheDocument();
  });

  it("adds new inputs when selecting 'imagen' and 'cita en cursiva'", async () => {
    const { addImage, addQuote } = await newArticleSetup();
    addImage();
    addQuote();
    expect(screen.getAllByTestId("added-field")).toHaveLength(2);
  });

  it("posts to backend when creating new post", async () => {
    const { addText, createPost } = await newArticleSetup();
    const sampleTitle = "Sample title";
    const mockFetch = jest
      .spyOn(window, "fetch")
      .mockImplementation((url, options) => {
        expect(url).toBe(`${API_BASE_URL}/posts`);
        expect(options.method).toBe("post");
        expect(JSON.parse(options.body).post.title).toBe(sampleTitle);
        return new Promise((res) => res({ ok: true }));
      });
    userEvent.type(
      screen.getByRole("textbox", { name: "Ingrese el título del artículo" }),
      sampleTitle
    );
    addText("This is the text content of the body");
    createPost();
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });

  it("clears fields and removes added fields after successful form submission", async () => {
    const { addText, createPost } = await newArticleSetup();

    jest.restoreAllMocks();

    const sampleTitle = "Sample title";
    userEvent.type(
      screen.getByRole("textbox", { name: "Ingrese el título del artículo" }),
      sampleTitle
    );
    addText("This is the text content of the body");
    const mockFetch = jest
      .spyOn(window, "fetch")
      .mockImplementation(() => new Promise((res) => res({ ok: true })));
    expect(screen.getByTestId("added-field")).toBeInTheDocument();
    createPost();
    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    expect(
      screen.queryByRole("textbox", { name: "Ingrese el texto de la sección" })
    ).not.toBeInTheDocument();
  });
});
