/* eslint-disable no-undef */
/// <reference types="cypress" />

describe("show article", () => {
  it("should display article title", () => {
    cy.visit("/articulo/1-como-lograr-un-buen-acople");
    cy.get("h1.article-title").should(
      "have.text",
      "Como lograr un buen acople"
    );
  });

  context("on different post", () => {
    it("should display title and article main image", () => {
      cy.visit("/articulo/2-mi-primer-articulo");
      cy.get("h1.article-title").should("have.text", "Mi primer articulo");
      cy.get(".article-main-image").should("exist");
    });
  });
});
