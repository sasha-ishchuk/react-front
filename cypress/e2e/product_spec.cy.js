describe('Product page', () => {
  it('load product page', () => {
    cy.request('http://localhost:3000/product')
        .then((response) => {
          expect(response.status).to.eq(200);
        });
    cy.visit('http://localhost:3000/product');
  })
})

describe('Product page - header', () => {
  it('displays page header', () => {
    cy.visit('http://localhost:3000/product');
    cy.contains('Product').should('be.visible');
  })
})

describe('Negative scenario', () => {
  it('do not display page header', () => {
    cy.request({
      url: 'http://localhost:3000/produt',
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
    cy.visit('http://localhost:3000/produt');
    cy.get('.my-4').should('not.contain', 'Product');
  });
});

describe('Product component - 1', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/product');
  });

  it('displays product ID when fetch is successful', () => {
    cy.get('p').contains('ID:').should('be.visible');
  });

  it('displays product Name when fetch is successful', () => {
    cy.get('p').contains('Name:').should('be.visible');
  });

  it('displays product Price when fetch is successful', () => {
    cy.get('p').contains('Price:').should('be.visible');
  });

  it('displays product Description when fetch is successful', () => {
    cy.get('p').contains('Description:').should('be.visible');
  });
});

describe('Product component - 2', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/product');
  });

  it('displays product when product exists', () => {
    cy.get('.my-4').should('be.visible');
  });

  it('displays product when change input', () => {
    cy.get('input').clear().type('6');
    cy.get('.my-4').should('be.visible');
  });
});

describe('Product component - 3', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/product');
    cy.get('input').clear().type('6');
  });

  it('displays correct product ID when fetch is successful', () => {
    cy.get('p').should('contain', 'ID: 6');
  });

  it('displays correct product Name when fetch is successful', () => {
    cy.get('p').should('contain', 'Name: iPhone 19');
  });

  it('displays correct product Price when fetch is successful', () => {
    cy.get('p').should('contain', 'Price: 1799.99');
  });

  it('displays correct product Description when fetch is successful', () => {
    cy.get('p').should('contain', 'Description: Future iPhone 19, 128GB');
  });
});

describe('Product component 4 - test error', () => {

  it('displays error message when product does not exist' , () => {
    cy.visit('http://localhost:3000/product');
    cy.get('input').clear().type('7');
    cy.get('.alert-danger').contains('Error fetching product data').should('be.visible');
  });
});
