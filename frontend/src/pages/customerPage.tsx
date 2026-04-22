import { useState } from "react";
import { useCustomers } from "../hooks/useCustomers";
import CustomerForm from "../components/customers/CustomerForm";
//import CustomerTable from "../components/customers/CustomerTable";
import Table from "../components/common/table";
import type { Customer } from "../types/customer";
import SearchBar from "../components/common/SearchBar";


// This page manages customers, allowing users to view, add, edit, and delete customer records.
export default function CustomersPage() {
  const { customers, addCustomer, editCustomer, removeCustomer } = useCustomers();

  const [search, setSearch] = useState("");

  const filteredCustomers = customers.filter((c: Customer) =>
  c.customer_name.toLowerCase().includes(search.toLowerCase()) ||
  c.email.toLowerCase().includes(search.toLowerCase())
);

  const [editingCustomer, setEditingCustomer] = useState<any>(null);

  const handleSubmit = async (form: any) => {
    if (editingCustomer) {
      await editCustomer(editingCustomer.customer_id, form);
      setEditingCustomer(null);
    } else {
      await addCustomer(form);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Customers</h1>

      <CustomerForm
        onSubmit={handleSubmit}
        editingCustomer={editingCustomer}
        onCancel={() => setEditingCustomer(null)}
      />
      <SearchBar
        value={search}
        onChange={setSearch}
      />
      <Table
        rowKey="customer_id"
        data={filteredCustomers}
        columns={[
          { key: "customer_name", label: "Name" },
          { key: "email", label: "Email" },
        ]}
        actions={[
          { label: "Edit", onClick: (row: any) => setEditingCustomer(row) },
          { label: "Delete", onClick: (row: any) => removeCustomer(row.customer_id) },
        ]}
      />
    </div>
  );
}