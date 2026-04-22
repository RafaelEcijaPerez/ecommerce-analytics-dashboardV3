import React from "react";
import "../../styles/table.css";

type Column<T> = {
  key: keyof T;
  label: string;
  render?: (item: T) => React.ReactNode;
};

type Action<T> = {
  label: string;
  onClick: (item: T) => void;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  actions?: Action<T>[];
  rowKey: keyof T;
  loading?: boolean;
};

export default function Table<T>({
  columns,
  data,
  actions,
  rowKey,
  loading = false,
}: TableProps<T>) {

  if (loading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Cargando datos...
      </div>
    );
  }

  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={String(col.key)}>
              {col.label}
            </th>
          ))}
          {actions && <th>Acciones</th>}
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length + (actions ? 1 : 0)}
            >
              No hay datos disponibles
            </td>
          </tr>
        ) : (
          data.map((item, index) => {
            const keyValue = item[rowKey];

            return (
              <tr
                key={
                  keyValue !== undefined && keyValue !== null
                    ? String(keyValue)
                    : `fallback-${index}`
                }
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#f3f4f6")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                {columns.map((col) => (
                  <td key={String(col.key)} style={{ padding: "10px" }}>
                    {col.render
                      ? col.render(item)
                      : item[col.key] !== undefined && item[col.key] !== null
                      ? String(item[col.key])
                      : "-"}
                  </td>
                ))}

                {actions && (
                  <td>
                    {actions.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => action.onClick(item)}
                      >
                        {action.label}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}