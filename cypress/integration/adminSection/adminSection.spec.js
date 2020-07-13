/* eslint-disable no-undef */
/// <reference types="cypress" />

describe("admin section", () => {
  before(() => {
    cy.visit("/admin");
    localStorage.removeItem("access_token");
  });

  it("requires credentials when not signed in", () => {
    cy.get("[data-testid='login-form']").should("be.visible");
  });

  it("displays admin panel after logging in", () => {
    cy.get("[data-testid='login-form']").within(() => {
      cy.get(`input[type='text']`).type("example@gmail.com");
      cy.get(`input[type='password']`).type("123123");
      cy.get(`button`).click();
    });
    cy.get("[data-testid='admin-section']").should("exist");
  });

  it("has default fields for title and image url", () => {
    cy.get("[data-testid='post-title-input']").should("exist");
    cy.get("[data-testid='main-image-url-input']").should("exist");
  });

  it("has select with new field options", () => {
    cy.get("[data-testid='new-field-type-selector']")
      .select("Imagen")
      .select("Sección de texto")
      .select("Cita en cursiva");
  });

  it("adds new inputs of each category and they can receive content", () => {
    cy.get("[data-testid='new-field-type-selector']").as("selector");
    cy.get("[data-testid='admin-section'] .new-field-adder button").as(
      "addBtn"
    );
    cy.get("@selector").select("Imagen");
    cy.get("@addBtn").click();
    cy.get("@selector").select("Sección de texto");
    cy.get("@addBtn").click();
    cy.get("@selector").select("Cita en cursiva");
    cy.get("@addBtn").click();
    cy.get(".added-field").as("addedFields");
    cy.get("@addedFields")
      .should("have.length", 3)
      .first()
      .type("www.path-to-image.com/cat.jpeg")
      .should("have.value", "www.path-to-image.com/cat.jpeg")
      .next()
      .type("This is random text for text purposes only")
      .should("have.value", "This is random text for text purposes only")
      .next()
      .type("This is quoted test text")
      .should("have.value", "This is quoted test text");
  });

  it("sends json data to backend and clear fields when succeeded", () => {
    cy.server();

    const sampleTitle = "This is a sample title";
    const sampleImage = "www.images.com/image.jpeg";
    cy.route("POST", "**/posts", { ok: true }).as("createPost");
    cy.get("[data-testid='post-title-input'")
      .as("titleInput")
      .type(sampleTitle);
    cy.get("[data-testid='main-image-url-input'")
      .as("imageInput")
      .type(sampleImage);
    cy.get(".post-submit-button").click();
    cy.wait("@createPost").then((xhr) => {
      expect(xhr.requestBody.post.title).to.equal(sampleTitle);
      expect(xhr.requestBody.post.image).to.equal(sampleImage);
    });
    cy.get(".added-field").should("not.exist");
    cy.get("@titleInput").should("have.value", "");
    cy.get("@imageInput").should("have.value", "");
  });
});
