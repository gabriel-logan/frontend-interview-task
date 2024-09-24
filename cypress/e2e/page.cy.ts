describe("Home Page", () => {
  it("should load home page and show components", () => {
    cy.visit("http://localhost:3000");
    cy.get("button").contains(/See Products/i);
  });

  it("should navigate to products page", () => {
    cy.visit("http://localhost:3000");
    cy.get("button")
      .contains(/See Products/i)
      .click();
    cy.url().should("include", "/products");
  });
});
