describe("Products Page", () => {
  it("should render correctly and show components", () => {
    cy.visit("http://localhost:3000/products/1");
    cy.get("header").contains(/Explore Our Products/i);
    cy.get("a").contains(/← Back to Products/i);
  });

  it("should show the product details", () => {
    cy.visit("http://localhost:3000/products/1");
    cy.get("p[datatype=product-description]").should("exist");
  });

  it("should add a product to the cart", () => {
    cy.visit("http://localhost:3000/products/1");
    cy.get("button")
      .contains(/Add to Cart/i)
      .click();
    cy.get(".Toastify__toast-body").contains(/Product added to cart/i);
  });

  it("should show the cart modal", () => {
    cy.visit("http://localhost:3000/products/1");
    cy.get("button")
      .contains(/Add to Cart/i)
      .click();

    cy.get("button[datatype=cart-link]").click();
    cy.get("img[datatype=cart-item-image]").should("exist");
  });

  it("should go back to the products page", () => {
    cy.visit("http://localhost:3000/products/1");
    cy.get("a")
      .contains(/← Back to Products/i)
      .click();
    cy.url().should("include", "/products");
  });
});
