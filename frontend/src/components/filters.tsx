import { useState, useEffect } from "react";
import { getCategories } from "../services/salesServices";

export default function Filters({ onFilter }: any) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await getCategories();
      setCategories(cats);
    };
    loadCategories();
  }, []);

  const applyFilters = () => {
    onFilter({
      start_date: startDate.trim(),
      end_date: endDate.trim(),
      category: category.trim(),
    });
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input type="date" onChange={(e) => setStartDate(e.target.value)} />
      <input type="date" onChange={(e) => setEndDate(e.target.value)} />
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="">Todas las categorías</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <button onClick={applyFilters}>Filtrar</button>
    </div>
  );
}