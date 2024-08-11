describe('Categories page', () => {
    it('load categories page', () => {
        cy.request('http://localhost:3000/products')
            .then((response) => {
                expect(response.status).to.eq(200);
            });
        cy.visit('http://localhost:3000/categories');
    })
})

describe('Categories page - header', () => {
    it('displays page header', () => {
        cy.visit('http://localhost:3000/products');
        cy.contains('Categories').should('be.visible');
    })
})

describe('Negative scenario', () => {
    it('do not display page header', () => {
        cy.request({
            url: 'http://localhost:3000/produts',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
        cy.visit('http://localhost:3000/produts');
        cy.get('.my-4').should('not.contain', 'Categories');
    });
});

describe('Categories component - 1', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/products');
    });

    it('displays category name 1 when fetch is successful', () => {
        cy.get('.list-group-item').contains('Electronics').should('be.visible');
    });

    it('displays category name 2 when fetch is successful', () => {
        cy.get('.list-group-item').contains('Books').should('be.visible');
    });

    it('displays category name 3 when fetch is successful', () => {
        cy.get('.list-group-item').contains('Clothing').should('be.visible');
    });
})

describe('Categories component - 2', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/products');
    });

    it('displays item 1 Name when fetch is successful', () => {
        cy.get('.list-group-item').contains('Name: iPhone 15').should('be.visible');
    });

    it('displays item 1 Description when fetch is successful', () => {
        cy.get('.list-group-item').contains('Description: Latest Apple iPhone 15, 256GB').should('be.visible');
    });

    it('displays item 1 Price when fetch is successful', () => {
        cy.get('.list-group-item').contains('Price: 1200').should('be.visible');
    });

    it('displays item 2 Name when fetch is successful', () => {
        cy.get('.list-group-item').contains('Name: iPhone 13').should('be.visible');
    });

    it('displays item 2 Description when fetch is successful', () => {
        cy.get('.list-group-item').contains('Description: Latest Apple iPhone 13, 128GB').should('be.visible');
    });

    it('displays item 2 Price when fetch is successful', () => {
        cy.get('.list-group-item').contains('Price: 799.99').should('be.visible');
    });

    it('displays item 3 Name when fetch is successful', () => {
        cy.get('.list-group-item').contains('Name: iPhone 19').should('be.visible');
    });

    it('displays item 3 Description when fetch is successful', () => {
        cy.get('.list-group-item').contains('Description: Future iPhone 19, 128GB').should('be.visible');
    });

    it('displays item 3 Price when fetch is successful', () => {
        cy.get('.list-group-item').contains('Price: 1799.99').should('be.visible');
    });
})