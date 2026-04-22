import api from "./api";

export const getSales = async () => {
  const response = await api.get("/sales/details");
  return response.data;
};

export const getSalesSummary = async (filters?: any) => {
  const params: any = {};
  if (filters?.start_date) params.start_date = filters.start_date;
  if (filters?.end_date) params.end_date = filters.end_date;
  if (filters?.category) params.category = filters.category;
  const response = await api.get("/sales/summary", { params });
  return response.data;
}

export const getSaleByDate = async (filters?: any) => {
  const params: any = {};
  if (filters?.start_date) params.start_date = filters.start_date;
  if (filters?.end_date) params.end_date = filters.end_date;
  if (filters?.category) params.category = filters.category;
  const response = await api.get("/sales/grouped-by-date", { params });
  return response.data;
};

export const getFilteredSales = async (filters: any) => {
  const params: any = {};
  if (filters?.start_date) params.start_date = filters.start_date;
  if (filters?.end_date) params.end_date = filters.end_date;
  if (filters?.category) params.category = filters.category;
  const response = await api.get("/sales/filtered", { params });
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get("/products/categories");
  return response.data;
};

export const createSale = async (saleData: any) => {
  const response = await api.post("/sales/create");
  return response.data;
}

export const updateSale = async (id: number, saleData: any) => {
  const response = await api.put(`/sales/update/${id}`, saleData);
  return response.data;
}

export const deleteSale = async (id: number) => {
  const response = await api.delete(`/sales/delete/${id}`);
  return response.data;
}