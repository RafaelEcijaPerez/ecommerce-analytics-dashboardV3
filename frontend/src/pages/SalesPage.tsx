import { useState } from "react";
import KPICards from "../components/KPICards";
import SalesChart from "../components/SalesChart";
import Filter from "../components/filters";
import Table from "../components/common/table";

import { useSales } from "../hooks/useSales";
import SaleForm from "../components/Sales/SaleForm";

export default function SalesPage() {
  const {
    sales,
    customers,
    products,
    addSale,
    removeSale,
    editSale,
    loading,
  } = useSales();

  const [filters, setFilters] = useState({});
  const [editingSale, setEditingSale] = useState<any>(null);

  if (loading) return <p>Cargando...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <Filter onFilter={setFilters} />
      <KPICards sales={sales} />
      <SalesChart filters={filters} />

      <h2 style={{ marginTop: "40px" }}>Ventas</h2>

      <SaleForm
        customers={customers}
        products={products}
        editingSale={editingSale}
        onCancel={() => setEditingSale(null)}
        onSubmit={(data: any, id?: number) => {
          if (id) return editSale(id, data);
          return addSale(data);
        }}
      />

      <Table
        rowKey="sale_id"
        data={sales}
        columns={[
          { key: "customer_name", label: "Cliente" },
          { key: "product_name", label: "Producto" },
          { key: "quantity", label: "Cantidad" },
          { key: "total_amount", label: "Total" },
          { key: "date", label: "Fecha" },
        ]}
        actions={[
          {
            label: "Editar",
            onClick: (row: any) => setEditingSale(row),
          },
          {
            label: "Eliminar",
            onClick: (row: any) => removeSale(row.sale_id),
          },
        ]}
      />
    </div>
  );
}