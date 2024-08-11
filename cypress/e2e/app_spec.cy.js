describe('Main page', () => {
  it('load main page', () => {
    cy.request('http://localhost:3000/')
        .then((response) => {
          expect(response.status).to.eq(200);
        });
    cy.visit('http://localhost:3000/');
  })
})

describe('Main page - welcome message', () => {
    it('displays welcome message', () => {
        cy.visit('http://localhost:3000/');
        cy.contains('Welcome to the Store').should('be.visible');
    })
})

describe('Main page - navbar elements', () => {
  it('contains all elements in the navbar', () => {
    cy.visit('http://localhost:3000/')
    cy.get('.navbar-nav').within(() => {
      cy.contains('Categories').should('be.visible');
      cy.contains('Product').should('be.visible');
      cy.contains('Cart').should('be.visible');
      cy.contains('Payment').should('be.visible');
    });
  })
})

describe('Negative scenario', () => {
    it('do not display welcome message', () => {
        cy.request({
            url: 'http://localhost:3000/main',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
        cy.visit('http://localhost:3000/main');
        cy.get('.my-4').should('not.contain', 'Welcome to the Store');
    });
});



