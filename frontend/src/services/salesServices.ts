import api from "./api";

export const getSales = async () => {
  const response = await api.get("/sales/details");
  return response.data;
};

export const getSalesSummary = async () => {
  const response = await api.get("/sales/summary");
  return response.data;
}

export const getSaleByDate = async () => {
  const response = await api.get("/sales/grouped-by-date");
  return response.data;
};