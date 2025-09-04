import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import List from "./pages/Categories/List";
import Details from "./pages/Categories/Details";
import Add from "./pages/Categories/Add";
import Edit from "./pages/Categories/Edit";
import Subcategories from "./pages/Categories/Subcategories";

export default function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <nav
        style={{
          display: "flex",
          gap: "16px",
          padding: "14px 24px",
          borderBottom: "1px solid #e5e7eb",
          backgroundColor: "#2563eb", // أزرق
          position: "sticky",
          top: 0,
          zIndex: 50,
        }}
      >
        <Link to="/categories" style={linkStyle}>
          📂 الأقسام
        </Link>
        <Link to="/categories/add" style={linkStyle}>
          ➕ إضافة قسم
        </Link>
      </nav>

      {/* Main Content */}
      <div
        style={{
          padding: "24px",
          minHeight: "100vh",
          backgroundColor: "#f9fafb", // رمادي فاتح
          fontFamily: "Cairo, sans-serif",
        }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/categories" replace />} />
          <Route path="/categories" element={<List />} />
          <Route path="/categories/add" element={<Add />} />
          <Route path="/categories/:id" element={<Details />} />
          <Route path="/categories/:id/edit" element={<Edit />} />
          <Route path="/categories/:id/sub" element={<Subcategories />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// CSS للروابط
const linkStyle: React.CSSProperties = {
  color: "white",
  fontWeight: 600,
  fontSize: "15px",
  textDecoration: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  transition: "background 0.3s",
  display: "flex",
  alignItems: "center",
};

// Hover effect بالـ JavaScript
(document as any).addEventListener("mouseover", (e: any) => {
  if (e.target.tagName === "A" && e.target.style) {
    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
  }
});
(document as any).addEventListener("mouseout", (e: any) => {
  if (e.target.tagName === "A" && e.target.style) {
    e.target.style.backgroundColor = "transparent";
  }
});
