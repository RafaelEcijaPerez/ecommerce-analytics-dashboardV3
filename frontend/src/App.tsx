import { useState } from "react";
import SalesPage from "./pages/SalesPage";
import ProductsPage from "./pages/productPage";
import CustomersPage from "./pages/customerPage";

function App() {
  const [activePage, setActivePage] = useState("sales");

  const menuItems = [
    { key: "sales", label: "Dashboard" },
    { key: "products", label: "Products" },
    { key: "customers", label: "Customers" },
  ];

  const buttonStyle = (selected: boolean) => ({
    padding: "10px 18px",
    borderRadius: "8px",
    border: selected ? "2px solid #2563eb" : "2px solid transparent",
    background: selected ? "#eff6ff" : "#f3f4f6",
    color: "#111827",
    cursor: "pointer",
    fontWeight: selected ? 600 : 500,
  });

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>E-commerce Analytics Dashboard</h1>

      <nav
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "12px",
          margin: "24px 0",
        }}
      >
        {menuItems.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setActivePage(item.key)}
            style={buttonStyle(activePage === item.key)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <main>
        {activePage === "sales" && <SalesPage />}
        {activePage === "products" && <ProductsPage />}
        {activePage === "customers" && <CustomersPage />}
      </main>
    </div>
  );
}

export default App;