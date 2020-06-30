/* eslint-disable no-undef */
/// <reference types="cypress" />

describe("navbar", () => {
  before(() => {
    cy.visit("/");
  });

  // it("has h1 tag with page name", () => {
  //   cy.get("[data-testid='header-section']").within(() => {
  //     cy.get("h1").should("contain", APP_NAME);
  //   });
  // });
});
