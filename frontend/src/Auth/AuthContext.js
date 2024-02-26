import React, { createContext, useContext, useState, useEffect } from 'react';


const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const storedUserData = localStorage.getItem('user');
        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setCurrentUser(userData);
        }
    }, []);

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setCurrentUser(userData);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setCurrentUser(null);
    };

    const value = { currentUser, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
