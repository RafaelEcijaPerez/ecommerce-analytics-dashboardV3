import KPICards from "../components/KPICards";
import SalesChart from "../components/SalesChart";

export default function SalesPage() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <KPICards />
      <SalesChart />
    </div>
  );
}