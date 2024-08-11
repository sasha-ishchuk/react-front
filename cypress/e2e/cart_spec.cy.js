describe('Cart page', () => {
    it('load cart page', () => {
        cy.request('http://localhost:3000/cart')
            .then((response) => {
                expect(response.status).to.eq(200);
            });
        cy.visit('http://localhost:3000/cart');
    })
})

describe('Cart page - header', () => {
    it('displays page header', () => {
        cy.visit('http://localhost:3000/cart');
        cy.contains('Cart').should('be.visible');
    })
})

describe('Negative scenario', () => {
    it('do not display page header', () => {
        cy.request({
            url: 'http://localhost:3000/carts',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
        cy.visit('http://localhost:3000/carts');
        cy.get('.my-4').should('not.contain', 'Cart');
    });
});

describe('Cart component 1', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/cart');
    });

    it('displays cart ID when fetch is successful', () => {
        cy.get('p').contains('Cart ID:').should('be.visible');
    });

    it('displays products when cart has products', () => {
        cy.get('.list-group-item').should('be.visible');
    });

    it('displays products when cart has products', () => {
        cy.get('.list-group-item').contains('iPhone 15 - 1200').should('be.visible');
    });
});

describe('Cart component 2', () => {

    it('changes cart ID when input value changes', () => {
        cy.visit('http://localhost:3000/cart');
        cy.get('input').clear().type('3');
        cy.get('input').clear().type('1');
        cy.get('p').contains('Cart ID: 1').should('be.visible');
    });
});

describe('Cart component 3 - test error', () => {

    it('displays error message when cart does not exist' , () => {
        cy.visit('http://localhost:3000/cart');
        cy.get('input').clear().type('5');
        cy.get('.alert-danger').contains('Error fetching cart data').should('be.visible');
    });
});