describe("Home Page", () => {
  it("should load all pages", () => {
    cy.visit("http://localhost:3000");
    cy.wait(1000);
    cy.visit("http://localhost:3000/products");
    cy.wait(1000);
    cy.visit("http://localhost:3000/products/1");
  });

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
