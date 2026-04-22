import { calculateKPIs } from "../utils/kpis";

export default function KPICards({ sales }: any) {
  const { totalSales, todaySales, topProduct } = calculateKPIs(sales);

  return (
    <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
      <div style={cardStyle}>
        <h3>Total Ventas</h3>
        <p>{totalSales.toFixed(2)} €</p>
      </div>

      <div style={cardStyle}>
        <h3>Ventas Hoy</h3>
        <p>{todaySales.toFixed(2)} €</p>
      </div>

      <div style={cardStyle}>
        <h3>Top Producto</h3>
        <p>{topProduct}</p>
      </div>
    </div>
  );
}

const cardStyle = {
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  width: "200px",
};