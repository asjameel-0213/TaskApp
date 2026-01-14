import { Link } from "react-router-dom";
import styled from "styled-components";

const Box = styled.div`
    padding: 2rem;
    text-align: center;
`;

export default function NotFound() {
    return (
        <Box>
            <h2>404 — Page Not Found</h2>
            <p>We couldn’t find what you were looking for.</p>
            <Link to="/">Go back Home</Link>
        </Box>
    );
}