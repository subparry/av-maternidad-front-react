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
});
