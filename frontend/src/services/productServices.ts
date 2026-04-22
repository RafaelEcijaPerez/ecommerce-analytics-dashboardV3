//Servicios para los productos, para obtener la lista de productos y los detalles de un producto específico
import api from "./api";

export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
}

export const getProductById = async (productId: string) => {
  const response = await api.get(`/products/${productId}`);
  return response.data;
}

export const getProductByCategory = async (category: string) => {
  const response = await api.get(`/products/category/${category}`);
  return response.data;
}

export const createProduct = async (product: { name: string, category: string, price: number }) => {
  const response = await api.post("/products/create", product);
  return response.data;
}

export const updateProduct = async (productId: number, product: { name: string, category: string, price: number }) => {
  const response = await api.put(`/products/${productId}`, product);
  return response.data;
}

export const deleteProduct = async (productId: number) => {
  const response = await api.delete(`/products/${productId}`);
  return response.data;
}