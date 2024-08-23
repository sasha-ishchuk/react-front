import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Spinner, Alert, ListGroup } from 'react-bootstrap';

const Categories = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get('http://localhost:8080/categories', {
                    withCredentials: true
                });
                setProducts(response.data);
            } catch (error) {
                setError('Error fetching products data');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <Container>
            <h2 className="my-4">Categories</h2>
            {loading && <Spinner animation="border" className="my-4" />}
            {error && <Alert variant="danger" className="my-4">{error}</Alert>}
            {products.length > 0 ? (
                <ListGroup>
                    {products.map(category => (
                        <ListGroup.Item key={category.ID}>
                            <b>{category.Name}</b>
                            <ListGroup>
                                {category.Products.map(product => (
                                    <ListGroup.Item key={product.id}>
                                        <p>Name: {product.Name}</p>
                                        <p>Description: {product.Description}</p>
                                        <p>Price: {product.Price}</p>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                !loading && <p>No products available</p>
            )}
        </Container>
    );
};

export default Categories;
