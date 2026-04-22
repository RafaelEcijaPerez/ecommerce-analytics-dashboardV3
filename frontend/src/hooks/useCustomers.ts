import { useEffect, useState } from "react";
import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "../services/customerService";

export function useCustomers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCustomers = async () => {
    setLoading(true);
    const data = await getCustomers();
    setCustomers(data);
    setLoading(false);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const addCustomer = async (form: any) => {
    await createCustomer(form);
    await loadCustomers();
  };

  const editCustomer = async (id: number, form: any) => {
    await updateCustomer(id, form);
    await loadCustomers();
  };

  const removeCustomer = async (id: number) => {
    await deleteCustomer(id);
    await loadCustomers();
  };

  return {
    customers,
    loading,
    addCustomer,
    editCustomer,
    removeCustomer,
  };
}