import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        username: null,
        isLoading: true,
    });

    useEffect(() => {
        const fetchAuthStatus = async () => {
            try{
                const response = await axios.get('/auth/check', { withCredentials: true });
                setAuthState({
                    isAuthenticated: response.data.isAuthenticated,
                    username: response.data.isAuthenticated ? response.data.user.username : null,
                    isLoading: false,
                });
            }catch(error){
                setAuthState({
                    isAuthenticated: false,
                    username: null,
                    isLoading: false,
                });
            }
        };

        fetchAuthStatus();
    }, []);

    const login = async (username, password) => {
        try {
            const response = await axios.post( "/login", { username, password }, { withCredentials: true });
            if (response.data.success) {
                setAuthState({
                    isAuthenticated: true,
                    username: response.data.user.username,
                    isLoading: false,
                });
            }
        } catch (error) {
            throw error.response?.data?.message || "Login failed.";
        }
    };

    const logout = async () => {
        try {
            await axios.post('/logout', {}, { withCredentials: true });
            setAuthState({
                isAuthenticated: false,
                username: null,
                isLoading: false,
            });
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return(
        <AuthContext.Provider value={{ ...authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};