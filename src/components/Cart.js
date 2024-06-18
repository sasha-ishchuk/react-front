import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Cart = () => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get('http://localhost:8080/carts/1');
                setCart(response.data.products);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        fetchCart();
    }, []);

    return (
        <div>
            <h2>Cart</h2>
            <ul>
                {cart.map(item => (
                    <li key={item.id}>{item.name} - {item.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;
