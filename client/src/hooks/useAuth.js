import { useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser } from '../api/auth';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const useAuth = () => {
    const { setUser, setIsAuthenticated } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user = await fetch('/api/auth/check'); // Endpoint to check authentication
                if (user) {
                    setUser(user);
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [setUser, setIsAuthenticated]);

    const login = async (credentials) => {
        setLoading(true);
        try {
            const user = await loginUser(credentials);
            setUser(user);
            setIsAuthenticated(true);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        try {
            const user = await registerUser(userData);
            setUser(user);
            setIsAuthenticated(true);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await logoutUser();
            setUser(null);
            setIsAuthenticated(false);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return {
        login,
        register,
        logout,
        loading,
        error,
    };
};

export default useAuth;