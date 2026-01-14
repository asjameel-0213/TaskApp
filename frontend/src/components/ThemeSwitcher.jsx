import { FaMoon, FaSun } from "react-icons/fa";
import styled from "styled-components";

const Button = styled.button`
    background: none;
    border: none;
    color: ${({ theme }) => theme.text};
    font-size: 1.5rem;
    cursor: pointer;
`;

export default function ThemeSwitcher({ toggleTheme, darkMode }) {
    return (
        <Button onClick={toggleTheme}>
            {darkMode ? <FaSun /> : <FaMoon />}
        </Button>
    );
}