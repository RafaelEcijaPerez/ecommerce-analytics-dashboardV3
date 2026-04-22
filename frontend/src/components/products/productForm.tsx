import { useState } from "react";

export default function ProductForm({ onSubmit, editingProduct, onCancel }: any) {
    const [form, setForm] = useState({
        name: editingProduct?.product_name || "",
        category: editingProduct?.category || "",
        price: editingProduct?.price || "",
    });

    const handleChange = (e: any) => {
        const value = e.target.name === "price" ? Number(e.target.value) : e.target.value;
        setForm({
            ...form,
            [e.target.name]: value,
        });
    }

    const handleSubmit = () => {        if (!form.name || !form.category || form.price <= 0) {
            alert("Completa todos los campos correctamente");
            return;
        }
        onSubmit(form);
        setForm({
            name: "",
            category: "",
            price: 0,
        });
    }

    return (
        <div>
            <input name="name" placeholder="Nombre del producto" value={form.name} onChange={handleChange} />
            <input name="category" placeholder="Categoría" value={form.category} onChange={handleChange} />
            <input name="price" type="number" placeholder="Precio" value={form.price} onChange={handleChange} />
            <button onClick={handleSubmit}>
                {editingProduct ? "Actualizar" : "Crear"}
            </button>
        </div>
    );

}