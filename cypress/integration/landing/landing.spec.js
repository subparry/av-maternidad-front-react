/* eslint-disable no-undef */
/// <reference types="cypress" />

const { APP_NAME } = require("../../../src/support/constants");

describe("header section", () => {
  before(() => {
    cy.visit("/");
  });

  it("displays fullwidth image", () => {
    cy.get("[data-testid='header-section']").should(
      "have.class",
      "header-background"
    );
  });

  it("has h1 tag with page name", () => {
    cy.get("[data-testid='header-section']").within(() => {
      cy.get("h1").should("contain", APP_NAME);
    });
  });
});

describe("quote section", () => {
  it("has some meaningful quote", () => {
    cy.get("[data-testid='quote-section'] .parenthood-quote").should("exist");
  });
});

describe("last articles section", () => {
  it("display 3 articles on desktop view", () => {
    cy.viewport("macbook-13");
    cy.get("[data-testid='recent-articles-section']").within(() => {
      cy.get("[data-testid='article-preview-card']").should("have.length", 3);
    });
  });
});
