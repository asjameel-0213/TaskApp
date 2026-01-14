import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "./productSlice";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    padding: 1rem;
`;

const Card = styled.div`
    background: ${({ theme }) => theme.cardBg};
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
`;

const ImageContainer = styled.div`
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;
    background: #f5f5f5;
    border-radius: 4px;
`;

const ProductImage = styled.img`
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    border-radius: 4px;
`;

const PlaceholderDiv = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    border-radius: 4px;
`;

// Simplified image component - no complex fallback needed since seed uses reliable Picsum
function ProductImageWithFallback({ src, alt }) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    if (imageError || !src) {
        return <PlaceholderDiv>📦</PlaceholderDiv>;
    }

    return (
        <>
            <ProductImage
                src={src}
                alt={alt}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                style={{ display: imageLoaded ? "block" : "none" }}
            />

            {!imageLoaded && <PlaceholderDiv>⌛️</PlaceholderDiv>}
        </>
    );
}

export default function ProductList() {
    const dispatch = useDispatch();
    const { items, loading } = useSelector((state) => state.products);
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);
    
    if (loading) return <p>Loading products...</p>;
    if (!items.length) return <p>No products found.</p>;
    return (
        <Grid>
            {items.map((product) => (
                <Card key={product.id}>
                    <ImageContainer>
                        <ProductImageWithFallback
                            src={product.imageUrl}
                            alt={product.name}
                        />
                    </ImageContainer>
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                    <p>Status: {product.inStock ? "✅ In Stock" : "❌ Out of Stock"}</p>
                    <Link to={`/products/${product.id}`}>View Details</Link>
                </Card>
            ))}
        </Grid>
    );
}   