import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Products from './components/Products';
import Cart from './components/Cart';
import Payment from './components/Payment';
import './App.css';

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/cart">Cart</Link></li>
                        <li><Link to="/payment">Payment</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path="/products" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/payment" element={<Payment />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
