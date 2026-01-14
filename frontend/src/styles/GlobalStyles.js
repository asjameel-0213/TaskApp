import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body {
        margin: 0;
        background: ${({ theme }) => theme.background};
        color: ${({ theme }) => theme.text};
        font-family: Arial, sans-serif;
        transition: all 0.25s linear;
    }
    a {
        color: ${({ theme }) => theme.text};
        text-decoration: none;
    }
`;