import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Spinner, Alert, ListGroup } from 'react-bootstrap';

const Cart = () => {
    const [cartId, setCartId] = useState(1);
    const [cart, setCart] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCart = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`http://localhost:8080/carts/${cartId}`, {
                    withCredentials: true
                });
                setCart(response.data);
            } catch (error) {
                setError('Error fetching cart data');
            } finally {
                setLoading(false);
            }
        };

        fetchCart();
    }, [cartId]);

    const handleCartIdChange = (e) => {
        setCartId(e.target.value);
    };

    return (
        <Container>
            <h2 className="my-4">Cart</h2>
            <Form>
                <Form.Group controlId="cartId">
                    <Form.Label>Enter Cart ID:</Form.Label>
                    <Form.Control
                        type="number"
                        value={cartId}
                        onChange={handleCartIdChange}
                    />
                </Form.Group>
            </Form>
            {loading && <Spinner animation="border" className="my-4" />}
            {error && <Alert variant="danger" className="my-4">{error}</Alert>}
            {cart.ID ? (
                <div className="my-4">
                    <p><strong>Cart ID: </strong> {cart.ID}</p>
                    {cart.Products && cart.Products.length > 0 ? (
                        <ListGroup>
                            {cart.Products.map(product => (
                                <ListGroup.Item key={product.id}>
                                    {product.Name} - {product.Price}
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p>No products in cart</p>
                    )}
                </div>
            ) : (
                !loading && <p>No cart data available</p>
            )}
        </Container>
    );
};

export default Cart;
