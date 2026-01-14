import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function Register() {
const { register, loading, error, user } = useAuth();
const navigate = useNavigate();
const [form, setForm] = useState({
username: "",
email: "",
password: "",
});
const handleSubmit = async (e) => {
e.preventDefault();
await register(form.username, form.email, form.password);
if (!error) navigate("/");
};
if (user) {
return <p>You are already logged in.</p>;
}

return (
    <form
    onSubmit={handleSubmit}
    style={{ maxWidth: "400px", margin: "2rem auto", display: "flex", 
    flexDirection: "column", gap: "1rem" }}
    >
    <h2>Register</h2>
    {error && <p style = {{ color: "red" }}>{error}</p>}
    
    <input
    placeholder="Username"
    value={form.username}
    onChange={(e) => setForm({ ...form, username: e.target.value })}
    required
    />

    <input
    type="email"
    placeholder="Email"
    value={form.email}
    onChange={(e) => setForm({ ...form, email: e.target.value })}
    required
    />

    <input
    type="password"
    placeholder="Password"
    value={form.password}
    onChange={(e) => setForm({ ...form, password: e.target.value })}
    required
    />
    
    <button type="submit" disabled={loading}>
    {loading ? "Registering..." : "Register"}
    </button>
    </form>
    );
    }