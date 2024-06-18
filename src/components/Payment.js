import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
    const [paymentDetails, setPaymentDetails] = useState({ cardNumber: '', expiryDate: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/payments', paymentDetails);
            console.log('Payment successful:', response.data);
        } catch (error) {
            console.error('Error processing payment:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <div>
            <h2>Payment</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={paymentDetails.cardNumber}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="expiryDate"
                    placeholder="Expiry Date"
                    value={paymentDetails.expiryDate}
                    onChange={handleChange}
                />
                <button type="submit">Pay</button>
            </form>
        </div>
    );
};

export default Payment;
