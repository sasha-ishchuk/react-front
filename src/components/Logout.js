import React, { useEffect } from 'react';
import axios from '../axiosConfig';

const Logout = () => {
    useEffect(() => {
        const performLogout = async () => {
            try {
                await axios.get('/logout');
                window.location.href = '/login';
            } catch (error) {
                console.error('Error during logout:', error);
            }
        };

        performLogout();
    }, []);

    return <h2>Logging out...</h2>;
};

export default Logout;
