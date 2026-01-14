import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrap = styled.section`
    padding: 2rem;
    text-align: center;
`;

const CTA = styled(Link)`
    display: inline-block;
    margin-top: 1rem;
    padding: 0.75rem 1.25rem;
    border-radius: 8px;
    background: ${({ theme }) => theme.cardBg};
    color: ${({ theme }) => theme.text};
`;

export default function Home() {
    return (
        <Wrap>
            <h2>Welcome to the Products App</h2>
            <p>Browse, add, edit, and view products pulled from the backend.</p>
            <CTA to="/products">View Products</CTA>
        </Wrap>
    );
}