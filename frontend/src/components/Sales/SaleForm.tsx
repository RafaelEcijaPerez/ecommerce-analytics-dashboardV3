import { useEffect, useState } from "react";

export default function SaleForm({
  customers,
  products,
  onSubmit,
  editingSale,
  onCancel,
}: any) {
  const [form, setForm] = useState({
    customer_id: "",
    product_id: "",
    quantity: 1,
    date: new Date().toISOString().split("T")[0],
  });

  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (editingSale) {
      setForm({
        customer_id: editingSale.customer_id,
        product_id: editingSale.product_id,
        quantity: editingSale.quantity,
        date: editingSale.date,
      });
    }
  }, [editingSale]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    const newForm = {
      ...form,
      [name]: name === "quantity" ? Number(value) : value,
    };

    setForm(newForm);

    const product = products.find(
      (p: any) => p.product_id === Number(newForm.product_id)
    );

    if (product) {
      setTotal(product.price * newForm.quantity);
    }
  };

  const handleSubmit = async () => {
    if (!form.customer_id || !form.product_id) {
      alert("Completa los campos");
      return;
    }

    const data = {
      ...form,
      customer_id: Number(form.customer_id),
      product_id: Number(form.product_id),
      total_amount: total,
    };

    if (editingSale) {
      await onSubmit(data, editingSale.sale_id);
    } else {
      await onSubmit(data);
    }

    setForm({
      customer_id: "",
      product_id: "",
      quantity: 1,
      date: new Date().toISOString().split("T")[0],
    });

    setTotal(0);
  };

  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      <select name="customer_id" value={form.customer_id} onChange={handleChange}>
        <option value="">Cliente</option>
        {customers.map((c: any) => (
          <option key={c.customer_id} value={c.customer_id}>
            {c.customer_name}
          </option>
        ))}
      </select>

      <select name="product_id" value={form.product_id} onChange={handleChange}>
        <option value="">Producto</option>
        {products.map((p: any) => (
          <option key={p.product_id} value={p.product_id}>
            {p.product_name}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="quantity"
        value={form.quantity}
        onChange={handleChange}
        min={1}
      />

      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />

      <span>Total: {total.toFixed(2)} €</span>

      <button onClick={handleSubmit}>
        {editingSale ? "Actualizar" : "Crear"}
      </button>

      {editingSale && (
        <button onClick={onCancel}>Cancelar</button>
      )}
    </div>
  );
}