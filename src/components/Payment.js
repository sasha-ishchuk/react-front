import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const Payment = () => {
    const [paymentDetails, setPaymentDetails] = useState({ cardNumber: '', expiryDate: '', securityCode: '' });
    const [responseMessage, setResponseMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponseMessage('');
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:8080/payment', {
                Number: paymentDetails.cardNumber,
                ExpireDate: paymentDetails.expiryDate,
                SecurityCode: paymentDetails.securityCode
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setResponseMessage('Payment successful');
            console.log('Payment successful:', response.data);
        } catch (error) {
            setErrorMessage('Error processing payment');
            console.error('Error processing payment:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <Container>
            <h2 className="my-4">Payment</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="cardNumber" className="mb-3">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="cardNumber"
                        placeholder="XXXX XXXX XXXX XXXX"
                        value={paymentDetails.cardNumber}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="expiryDate" className="mb-3">
                    <Form.Label>Expiry Date</Form.Label>
                    <Form.Control
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={paymentDetails.expiryDate}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="securityCode" className="mb-3">
                    <Form.Label>CVV Code</Form.Label>
                    <Form.Control
                        type="text"
                        name="securityCode"
                        placeholder="XXX"
                        value={paymentDetails.securityCode}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Pay</Button>
            </Form>
            {responseMessage && <Alert variant="success" className="mt-3">{responseMessage}</Alert>}
            {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
        </Container>
    );
};

export default Payment;
