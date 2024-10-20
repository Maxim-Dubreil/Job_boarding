import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Retrieve stored user data and token from localStorage if available
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            // Check if token is expired
            if (parsedUser.token && isTokenExpired(parsedUser.token)) {
                logout(); // Token is expired, logout user
            } else {
                setUser(parsedUser);
            }
        }
    }, []);

    // Helper function to check token expiration
    const isTokenExpired = (token) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const expiration = payload.exp * 1000;
            return Date.now() > expiration;
        } catch (error) {
            console.error('Failed to parse token', error);
            return true;
        }
    };

    const login = (userData) => {
        // Ensure `nom` and `prenom` are part of the userData object
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
