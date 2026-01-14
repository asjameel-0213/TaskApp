import { Link } from "react-router-dom";
import styled from "styled-components";
import ThemeSwitcher from "./ThemeSwitcher";
import { useAuth } from "../context/AuthContext";

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    background: ${({ theme }) => theme.cardBg};
`;

export default function Navbar({ toggleTheme, darkMode }) {
    const { user, logout } = useAuth();
    return (
        <Nav>
            <div>
                <Link to="/">Home</Link> &nbsp;|&nbsp;
                <Link to="/products">Products</Link> &nbsp;|&nbsp;
                <Link to="/create">Add Product</Link> &nbsp;|&nbsp;
                {user?.role === "admin" && (
                    <>
                        <Link to="/admin">Admin Panel</Link> &nbsp;|&nbsp;
                    </>
                )}
            </div>
            
            <div>
                {user ? (
                    <>
                        <span style={{ marginRight: "1rem" }}>
                            👋🏼 {user.username} ({user.role})
                        </span>
                        <button onClick={logout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link> &nbsp;|&nbsp;
                        <Link to="/register">Register</Link>
                    </>
                )}

                <ThemeSwitcher toggleTheme={toggleTheme} darkMode={darkMode} />
            </div>
        </Nav>
    );
}