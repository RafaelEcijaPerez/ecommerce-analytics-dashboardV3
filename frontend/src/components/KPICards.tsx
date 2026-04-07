import { useEffect, useState } from "react";
import { getSalesSummary } from "../services/salesServices";

export default function KPICards() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getSalesSummary();
    setData(res);
  };

  if (!data) return <p>Cargando...</p>;

  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
      <div>
        <h3>Total Ventas</h3>
        <p>{data.total_sales}</p>
      </div>

      <div>
        <h3>Revenue</h3>
        <p>{data.total_revenue}</p>
      </div>

      <div>
        <h3>Ticket Medio</h3>
        <p>{data.avg_ticket}</p>
      </div>
    </div>
  );
}