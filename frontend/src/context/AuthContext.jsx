import { createContext, useState, useContext } from "react";
import axios from "axios";
const API_URL = "http://localhost:8888/api/auth";
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        // Load from localStorage if available
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    // Helper to save user & token (with role included)
    const saveUser = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", userData.token); // ensure token is stored separately
    };

    const register = async (username, email, password, role = "user") => {
        try {
            setLoading(true);
            setError(null);

            const res = await axios.post(`${API_URL}/register`, {
                username,
                email,
                password,
                role, // role from backend (default user)
            });
            saveUser(res.data);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setLoading(true);
            setError(null);

            const res = await axios.post(`${API_URL}/login`, {
                email,
                password,
            });
            saveUser(res.data); // res.data includes role + token
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
        // Custom hook for easy access
        // eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext);
}