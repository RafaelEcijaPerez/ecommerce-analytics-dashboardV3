import { useEffect, useState } from "react";
import { getSaleByDate } from "../services/salesServices"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface SalesChartProps {
  filters?: Record<string, unknown>;
}

export default function SalesChart({ filters }: SalesChartProps) {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, [filters]);

  const loadData = async () => {
    const res = await getSaleByDate(filters);
    setData(res);
  };

  return (
    <LineChart width={800} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" tick={{fontSize :10}} />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="total" strokeWidth={3} dot={false} />
    </LineChart>
  );
}

