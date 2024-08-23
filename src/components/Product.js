import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Spinner, Alert } from 'react-bootstrap';

const Product = () => {
    const [productId, setProductId] = useState(5);
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`http://localhost:8080/products/${productId}`, {
                    withCredentials: true
                });
                setProduct(response.data);
            } catch (error) {
                setError('Error fetching product data');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleProductIdChange = (e) => {
        setProductId(e.target.value);
    };

    return (
        <Container>
            <h2 className="my-4">Product</h2>
            <Form>
                <Form.Group controlId="productId">
                    <Form.Label>Enter Product ID:</Form.Label>
                    <Form.Control
                        type="number"
                        value={productId}
                        onChange={handleProductIdChange}
                    />
                </Form.Group>
            </Form>
            {loading && <Spinner animation="border" className="my-4" />}
            {error && <Alert variant="danger" className="my-4">{error}</Alert>}
            {product.ID ? (
                <div className="my-4">
                    <p><strong>ID:</strong> {product.ID}</p>
                    <p><strong>Name:</strong> {product.Name}</p>
                    <p><strong>Price:</strong> {product.Price}</p>
                    <p><strong>Description:</strong> {product.Description}</p>
                </div>
            ) : (
                !loading && <p>No product data available</p>
            )}
        </Container>
    );
};

export default Product;
