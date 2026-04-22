import { useState } from "react";
import { useProducts } from "../hooks/useProduct";
import ProductForm from "../components/products/productForm";
import Table from "../components/common/table";
import type { Product } from "../types/product";
import SearchBar from "../components/common/SearchBar";

export default function ProductsPage() {
  const { products, addProduct, editProduct, removeProduct } = useProducts();

  const [editingProduct, setEditingProduct] = useState<any>(null);

  const handleSubmit = async (form: any) => {
    if (editingProduct) {
      await editProduct(editingProduct.product_id, form);
      setEditingProduct(null);
    } else {
      await addProduct(form);
    }
  };


  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((p: Product) =>
    p.product_name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>

      <ProductForm
        onSubmit={handleSubmit}
        editingProduct={editingProduct}
        onCancel={() => setEditingProduct(null)}
      />

      <SearchBar value={search} onChange={setSearch} />

      <Table
        rowKey="product_id"
        data={filteredProducts}
        columns={[
          { key: "product_name", label: "Nombre" },
          { key: "category", label: "Categoría" },
          { key: "price", label: "Precio" },
        ]}
        actions={[
          { label: "Edit", onClick: (row: any) => setEditingProduct(row) },
          { label: "Delete", onClick: (row: any) => removeProduct(row.product_id) },
        ]}
      />
    </div>
  );
}