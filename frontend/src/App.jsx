// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProductList from "./features/products/ProductList";
import ProductDetail from "./features/products/ProductDetails";
import ProductForm from "./features/products/ProductForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminPanel from "./pages/AdminPanel";
import { ProtectedRoute, AdminRoute } from "./components/ProtectedRoute";

export default function App({ darkMode, toggleTheme }) {
  return (
    <>
      {/* Top navigation with theme switcher */}
      <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />

      {/* Define app routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/create"
          element={<ProtectedRoute><ProductForm /></ProtectedRoute>} 
        />
<Route path="/edit/:id"
  element={<ProtectedRoute><ProductForm /></ProtectedRoute>}
/>
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
{/* Admin-only route */}
<Route path="/admin"
element={<AdminRoute><AdminPanel /></AdminRoute>}
/>
<Route path="/home" element={<Navigate to="/" replace />} />
<Route path="*" element={<NotFound />} />
</Routes>
    </>
  );
}