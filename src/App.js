import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cart from './components/Cart';
import Product from './components/Product';
import Categories from './components/Categories';
import Payment from "./components/Payment";
import { Container, Navbar, Nav } from 'react-bootstrap';
import PrivateRoute from "./components/PrivateRoute";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";

function App() {
    return (
        <Router>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Store</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/products">Categories</Nav.Link>
                        <Nav.Link href="/product">Product</Nav.Link>
                        <Nav.Link href="/cart">Cart</Nav.Link>
                        <Nav.Link href="/payment">Payment</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                        <Nav.Link href="/logout">Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            <Container className="my-4">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/product" element={<Product />} />
                        <Route path="/products" element={<Categories />} />
                        <Route path="/payment" element={<Payment />} />
                    </Route>
                    <Route path="/" element={<h1>Welcome to the Store</h1>} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;
