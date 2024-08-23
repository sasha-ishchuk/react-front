import React, { useState } from 'react';
import axios from '../axiosConfig';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const Login = () => {
    const [loginDetails, setLoginDetails] = useState({ email: '', password: '' });
    const [responseMessage, setResponseMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponseMessage('');
        setErrorMessage('');

        try {
            const response = await axios.post('/login', {
                email: loginDetails.email,
                password: loginDetails.password
            });

            setResponseMessage('Login successful');
            console.log('Login successful:', response.data);
            // Optionally, redirect or update UI here
        } catch (error) {
            setErrorMessage('Error during login');
            console.error('Error during login:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginDetails(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <Container>
            <h2 className="my-4">Login</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={loginDetails.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={loginDetails.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Login</Button>
            </Form>
            {responseMessage && <Alert variant="success" className="mt-3">{responseMessage}</Alert>}
            {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
        </Container>
    );
};

export default Login;
