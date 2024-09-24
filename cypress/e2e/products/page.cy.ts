describe("Products Page", () => {
  it("should render correctly and show components", () => {
    cy.visit("http://localhost:3000/products");
    cy.get("header").contains(/Explore Our Products/i);
    cy.get("div[datatype=products-page]").should("exist");
    cy.get("div[datatype=product-card]").should("exist");
    cy.get("a[datatype=product-card-image-link]").should("exist");
    cy.get("button[datatype=add-to-cart]").should("exist");
  });

  it("should scroll to the bottom of the page", () => {
    cy.visit("http://localhost:3000/products");
    cy.scrollTo("bottom");
    cy.wait(1500);
    cy.scrollTo("bottom");
    cy.wait(1500);
  });

  it("should add a product to the cart", () => {
    cy.visit("http://localhost:3000/products");
    cy.get("button[datatype=add-to-cart]").first().click();
    cy.get(".Toastify__toast-body").contains(/Product added to cart/i);
  });

  it("should show toast error when adding a product already in the cart", () => {
    cy.visit("http://localhost:3000/products");
    cy.get("button[datatype=add-to-cart]").first().click();
    cy.get(".Toastify__toast-body").contains(/Product added to cart/i);
    cy.get("button[datatype=add-to-cart]").first().click();
    cy.get(".Toastify__toast-body").contains(/Product already in cart/i);
  });

  it("should not have any products in the cart", () => {
    cy.visit("http://localhost:3000/products");
    cy.get("button[datatype=cart-link]").click();
    cy.get("div").contains(/Your cart is empty/i);
    cy.get("img[datatype=cart-item-image]").should("not.exist");
  });

  it("should add a product to the cart and navigate to the cart page and show the product in the cart", () => {
    cy.visit("http://localhost:3000/products");
    cy.get("button[datatype=add-to-cart]").first().click();
    cy.get(".Toastify__toast-body").contains(/Product added to cart/i);
    cy.get("button[datatype=cart-link]").click();
    cy.get("img[datatype=cart-item-image]").should("exist");
  });

  it("should navigate to the product page", () => {
    cy.visit("http://localhost:3000/products");
    cy.get("a[datatype=product-card-image-link]").first().click();
    cy.url().should("include", "/products/");
  });
});
