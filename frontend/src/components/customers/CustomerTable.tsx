export default function CustomerTable({ customers, onEdit, onDelete }: any) {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {customers.map((c: any) => (
          <tr key={c.customer_id}>
            <td>{c.customer_name}</td>
            <td>{c.email}</td>
            <td>
              <button onClick={() => onEdit(c)}>Editar</button>
              <button onClick={() => onDelete(c.customer_id)}>Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}