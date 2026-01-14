import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
export default function AdminPanel() {
const { user } = useAuth();
const [users, setUsers] = useState([]);
const [error, setError] = useState("");
useEffect(() => {
if (user?.token) {
fetch("http://localhost:8888/api/users", {
headers: { Authorization: `Bearer ${user.token}` },
})
.then((res) => {
if (!res.ok) throw new Error("Failed to fetch users");
return res.json();
})
.then(setUsers)
.catch((err) => setError(err.message));
}
}, [user]);
const updateRole = async (id, role) => {
    try {
    const res = await fetch(`http://localhost:8888/api/users/${id}/role`, {
    method: "PATCH",
    headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({ role }),
    });
    if (!res.ok) throw new Error("Failed to update role");
    alert(`User ${id} updated to ${role}`);
    // Refresh list
    const updated = await fetch("http://localhost:8888/api/users", {
    headers: { Authorization: `Bearer ${user.token}` },
    }).then((r) => r.json());
    setUsers(updated);
    } catch (err) {
    setError(err.message);
    }
    };
    if (!user || user.role !== "admin") {
    return <p>⛔️ Access Denied: Admins only</p>;
    }
    return (
        <div>
        <h1>
        Admin Panel</h1>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <table border="1" cellPadding="5">
        <thead>
        <tr>
        <th>ID</th><th>Username</th><th>Email</th><th>Role</th><th>Action</th>
        </tr>
        </thead>
        <tbody>
        {users.map((u) => (
        <tr key={u.id}>
        <td>{u.id}</td>
        <td>{u.username}</td>
        <td>{u.email}</td>
        <td>{u.role}</td>
        <td>
        <button onClick={() => updateRole(u.id, "admin")}>
        Make Admin
        </button>
        <button onClick={() => updateRole(u.id, "user")}>Make User</button>
        </td>
        </tr>
        ))}
        </tbody>
        </table>
        </div>
        );
        }