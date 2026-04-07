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

export default function SalesChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await getSaleByDate();
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

