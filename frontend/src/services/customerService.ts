import api from "./api";

export const getCustomers = async () => {
    const res = await api.get("/customers");
    return res.data;
}

export const createCustomer = async (customer: { name: string, email: string }) => {
    const res = await api.post("/customers/create", customer);
    return res.data;
}

export const updateCustomer = async (customerId: number, customer: { name: string, email: string }) => {
    const res = await api.put(`/customers/${customerId}`, customer);
    return res.data;
}

export const deleteCustomer = async (customerId: number) => {
    const res = await api.delete(`/customers/${customerId}`);
    return res.data;
}
