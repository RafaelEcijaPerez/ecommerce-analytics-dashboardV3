import { useEffect, useState } from "react";
import {
  getSales,
  createSale,
  deleteSale,
  updateSale,
} from "../services/salesServices";

import { getCustomers } from "../services/customerService";
import { getProducts } from "../services/productServices";

export function useSales() {
  const [sales, setSales] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadData = async () => {
    setLoading(true);
    try {
      const [s, c, p] = await Promise.all([
        getSales(),
        getCustomers(),
        getProducts(),
      ]);

      setSales(s);
      setCustomers(c);
      setProducts(p);
    } catch (error) {
      console.error("Error cargando datos", error);
    } finally {
      setLoading(false);
    }
  };

  const addSale = async (sale: any) => {
    await createSale(sale);
    await loadData();
  };

  const removeSale = async (id: number) => {
    if (!window.confirm("¿Eliminar venta?")) return;
    await deleteSale(id);
    await loadData();
  };

  const editSale = async (id: number, data: any) => {
    await updateSale(id, data);
    await loadData();
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    sales,
    customers,
    products,
    addSale,
    removeSale,
    editSale,
    loading,
  };
}