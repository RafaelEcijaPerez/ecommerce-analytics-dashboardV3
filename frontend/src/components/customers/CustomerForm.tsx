import { useState } from "react";

export default function CustomerForm({ onSubmit, editingCustomer, onCancel }: any) {
  const [form, setForm] = useState({
    name: editingCustomer?.customer_name || "",
    email: editingCustomer?.email || "",
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!form.name || !form.email) {
      alert("Completa todos los campos");
      return;
    }

    onSubmit(form);
    setForm({ name: "", email: "" });
  };

  return (
    <div>
      <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} />
      <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />

      <button onClick={handleSubmit}>
        {editingCustomer ? "Actualizar" : "Crear"}
      </button>

      {editingCustomer && (
        <button onClick={onCancel}>Cancelar</button>
      )}
    </div>
  );
}