describe('Payment page', () => {
    it('load product page', () => {
        cy.request('http://localhost:3000/payment')
            .then((response) => {
                expect(response.status).to.eq(200);
            });
        cy.visit('http://localhost:3000/payment');
    })
})

describe('Payment page - header', () => {
    it('displays page header', () => {
        cy.visit('http://localhost:3000/payment');
        cy.contains('Payment').should('be.visible');
    })
})

describe('Negative scenario', () => {
    it('do not display page header', () => {
        cy.request({
            url: 'http://localhost:3000/paymentt',
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
        cy.visit('http://localhost:3000/paymentt');
        cy.get('.my-4').should('not.contain', 'Payment');
    });
});

describe('Payment component - 1', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/payment');
    });

    it('displays the payment form', () => {
        cy.get('form').should('be.visible');
    });

    it('displays the card number input', () => {
        cy.get('input[name="cardNumber"]').should('be.visible');
    });

    it('displays the expiry date input', () => {
        cy.get('input[name="expiryDate"]').should('be.visible');
    });

    it('displays the CVV code input', () => {
        cy.get('input[name="securityCode"]').should('be.visible');
    });

    it('displays the pay button', () => {
        cy.get('button[type="submit"]').should('be.visible');
    });
});

describe('Payment component - 2', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/payment');
    });

    it('submits the payment form', () => {
        cy.get('input[name="cardNumber"]').type('1234123412341234');
        cy.get('input[name="expiryDate"]').type('12/24');
        cy.get('input[name="securityCode"]').type('123');
        cy.get('button[type="submit"]').click();
        cy.get('.alert-success').contains('Payment successful').should('be.visible');
    });

    // negative scenario
    it('displays error message when payment processing fails', () => {
        cy.get('input[name="cardNumber"]').type('invalid');
        cy.get('input[name="expiryDate"]').type('invalid');
        cy.get('input[name="securityCode"]').type('invalid');
        cy.get('button[type="submit"]').click();
        cy.get('.alert-danger').contains('Error processing payment').should('be.visible');
    });
});