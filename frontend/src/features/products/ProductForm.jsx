import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, updateProduct, fetchProductById } from "./productSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductForm() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selected } = useSelector((state) => state.products);
    const [form, setForm] = useState({
        name: "", price: "", inStock: true, imageUrl: "",
    });
    
    const [imgLoaded, setImgLoaded] = useState(false);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (selected && id) {
            setForm(selected);
            setImgLoaded(false); // reset preview when switching products
        }
    }, [selected, id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (id) {
            dispatch(updateProduct({ id, productData: form }));
        } else {
            dispatch(createProduct(form));
        }
        navigate("/");
    };

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                padding: "1rem", maxWidth: "500px", margin: "auto",
                display: "flex", flexDirection: "column", gap: "1rem",
            }}
            >

            <input
                placeholder="Name" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} required
            />

            <input
                placeholder="Price" type="number" value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })} required
            />

            <input
                placeholder="Image URL" value={form.imageUrl}
                onChange={(e) => {
                    setForm({ ...form, imageUrl: e.target.value });
                    setImgLoaded(false);
                }}
            />

            {/*live image preview*/}
            {form.imageUrl && ( 
                <div style={{ textAlign: "center" }}>
                    {!imgLoaded && <p>Loading image preview...</p>}

                    <img src={form.imageUrl} alt="Preview" width="200"
                        style={{
                            display: imgLoaded ? "block" : "none",
                            margin: "auto", borderRadius: "8px",
                        }}
                        onLoad={() => setImgLoaded(true)}
                        onError={(e) => {
                            e.target.src = "https://via.placeholder.com/200?text=No+Image";
                            setImgLoaded(true);
                        }}
                    />
                </div>
            )};

            <label>
                <input
                    type="checkbox" checked={form.inStock}
                    onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
                />
                &nbsp;In Stock
            </label>

            <button type="submit">
                {id ? "Update" : "Create"} Product
            </button>
        </form>
    );
}