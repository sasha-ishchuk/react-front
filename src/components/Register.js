import React, { useState } from 'react';
import axios from '../axiosConfig'; // Use the configured Axios instance
import { Form, Button, Container, Alert } from 'react-bootstrap';

const Register = () => {
    const [userDetails, setUserDetails] = useState({ email: '', password: '', confirmPassword: '' });
    const [responseMessage, setResponseMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setResponseMessage('');
        setErrorMessage('');

        if (userDetails.password !== userDetails.confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('/register', {
                email: userDetails.email,
                password: userDetails.password
            });

            setResponseMessage('Registration successful');
            console.log('Registration successful:', response.data);
            // Optionally, redirect to login or auto-login
        } catch (error) {
            setErrorMessage('Error during registration');
            console.error('Error during registration:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails(prevState => ({ ...prevState, [name]: value }));
    };

    return (
        <Container>
            <h2 className="my-4">Register</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={userDetails.email}
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
                        value={userDetails.password}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="confirmPassword" className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={userDetails.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">Register</Button>
            </Form>
            {responseMessage && <Alert variant="success" className="mt-3">{responseMessage}</Alert>}
            {errorMessage && <Alert variant="danger" className="mt-3">{errorMessage}</Alert>}
        </Container>
    );
};

export default Register;
