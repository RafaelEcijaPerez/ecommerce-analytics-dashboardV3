# 🚀 Día 1 - Setup del Proyecto Backend

## 🎯 Objetivo

Configurar la base del backend profesional con FastAPI y PostgreSQL.

## 🧱 Tecnologías usadas

* FastAPI
* PostgreSQL
* SQLAlchemy
* Uvicorn

## ⚙️ Tareas realizadas

* Instalación de PostgreSQL
* Configuración de entorno Python (`venv`)
* Instalación de dependencias
* Creación de estructura del proyecto:

```
backend/
├── app/
│   ├── main.py
│   ├── database.py
│   ├── models/
│   ├── schemas/
│   ├── routes/
│   └── services/
```

## 🗄️ Base de datos

Se creó la base de datos:

```
sales_dashboard
```

## 🧠 Aprendizajes

* Configuración inicial backend profesional
* Conexión FastAPI + PostgreSQL
* Manejo de errores iniciales (uvicorn, psycopg2, imports)

## 🚧 Estado

✔ Backend funcionando
✔ Conexión a base de datos OK
❌ Sin tablas aún

# 📊 Día 2 - Modelado y Datos Ficticios

## 🎯 Objetivo

Crear estructura de base de datos y generar datos de prueba.

## 🧱 Tareas realizadas

### 🗄️ Tablas creadas

* `dim_date`
* `dim_customer`
* `dim_product`
* `fact_sales`

### 🔗 Relaciones

* Sales conectada con:

  * Fecha
  * Cliente
  * Producto

## ⚡ Seed de datos

Se implementó script con Faker para generar:

* 60 días de fechas
* 50 clientes
* Productos base
* 1000 ventas

## 🧠 Aprendizajes

* Diseño tipo Data Warehouse (dim + fact)
* Uso de Faker
* Inserción masiva de datos
* Debug de problemas de conexión DB

## 🚧 Estado

✔ Tablas creadas
✔ Datos insertados correctamente
✔ Base lista para backend real

# 🧠 Día 3 - Arquitectura Backend Profesional

## 🎯 Objetivo

Organizar el proyecto con buenas prácticas reales.

## 🧱 Arquitectura implementada

Separación en capas:

* **models/** → ORM (SQLAlchemy)
* **schemas/** → validación (Pydantic)
* **routes/** → endpoints
* **services/** → lógica de negocio

## ⚙️ Mejoras realizadas

* Separación de responsabilidades
* Limpieza de código
* Preparación para CRUD

## 🧠 Aprendizajes

* Arquitectura tipo Clean Architecture
* Separación de capas backend
* Organización escalable

## 🚧 Estado

✔ Estructura profesional lista
✔ Backend preparado para endpoints
❌ Sin CRUD aún

# 🔥 Día 4 - CRUD Completo + Relaciones (JOINs)

## 🎯 Objetivo

Convertir el backend en una API REST completa profesional.

## ⚙️ CRUD Implementado

Para:

* Products
* Customers
* Sales

### Endpoints:

* GET
* GET by ID
* POST
* PUT
* DELETE

## 🧠 Service Layer

Se movió toda la lógica a:

```
services/
```

✔ Separación total de lógica y rutas

## 🔗 Relaciones (JOINs)

Se implementó:

```python
joinedload(Sale.product)
joinedload(Sale.customer)
joinedload(Sale.date)
```

## 🚀 Endpoint avanzado

```
GET /sales/with-details
```

Devuelve:

* Producto
* Cliente
* Fecha
* Venta completa

## 📊 Funciones extra

* Filtros por producto, fecha, cantidad
* Resumen:

  * total ventas
  * revenue
  * ticket medio

## 🧠 Aprendizajes

* Relaciones en SQLAlchemy
* Optimización con joinedload
* Diseño de APIs reales
* Backend listo para frontend

## 🚧 Estado

✔ CRUD completo
✔ JOINs funcionando
✔ API profesional terminada

## 🚀 Próximo paso

👉 Integración con React + Dashboard

# 🚀 Día 5 - Frontend React + Integración con Backend

## 🎯 Objetivo

Construir el frontend del proyecto y conectarlo con la API backend.

---

## 🧱 Tecnologías usadas

* React (Vite)
* TypeScript
* Axios

---

## ⚙️ Tareas realizadas

### 🏗️ Creación del frontend

Se creó el proyecto con Vite:

```
npx create-vite@latest frontend
```

Estructura base:

```
src/
├── components/
├── pages/
├── services/
```

---

### 🌐 Conexión con backend

Se configuró Axios:

```ts
const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});
```

---

### 📡 Consumo de API

Endpoint utilizado:

```
GET /sales/details
```

Se creó un servicio:

```
services/salesService.ts
```

---

### 📊 Visualización de datos

Se implementó una tabla que muestra:

* ID de venta
* Producto
* Cliente
* Cantidad
* Total

Datos obtenidos directamente desde PostgreSQL a través del backend.

---

### ⚠️ Problemas solucionados

#### ❌ Error CORS

* El frontend no podía acceder al backend

✔ Solución:
Se añadió middleware en FastAPI:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

#### ❌ Ruta incorrecta

* Se estaba llamando a `/sales/with-details`

✔ Corrección:

```
/sales/details
```

---

## 🧠 Aprendizajes

* Conexión frontend-backend real
* Manejo de CORS
* Consumo de APIs con Axios
* Renderizado dinámico en React
* Debugging de errores reales

---

## 🚧 Estado

✔ Frontend conectado al backend
✔ Datos reales mostrados en tabla
✔ Fullstack funcional

---

## 🚀 Próximos pasos

### 📅 Día 6

* Gráficas (ventas)
* KPIs (revenue, total ventas, ticket medio)

### 📅 Día 7

* Filtros avanzados
* Mejora UI
* Interacciones

### 🔮 Futuro

* Crear ventas desde frontend (POST)
* Edición y borrado (CRUD completo)
* Dashboard tipo SaaS

---

# 📊 Día 6 - KPIs y Visualización de Datos

## 🎯 Objetivo

Transformar la aplicación en un dashboard real mostrando métricas clave y visualizaciones.

---

## 🧱 Tecnologías usadas

* React
* TypeScript
* Recharts
* FastAPI

---

## ⚙️ Tareas realizadas

### 📈 KPIs implementados

Se creó un endpoint en backend:

```http
GET /sales/summary
```

Devuelve:

* Total de ventas
* Revenue total
* Ticket medio

---

### 🧠 Lógica backend

Se utilizaron funciones de agregación:

* `COUNT`
* `SUM`
* `AVG`

---

### 💻 Visualización en frontend

Se crearon tarjetas KPI:

* Total ventas
* Revenue
* Ticket medio

---

### 📊 Gráfica de ventas por día

Se creó un endpoint:

```http
GET /sales/by-day
```

Que agrupa ventas por fecha.

---

### 🔥 Tipo de gráfica

Se implementó una **gráfica de línea**, ideal para:

* series temporales
* análisis de tendencias
* evolución de ventas

---

### ⚡ Integración completa

Frontend consume:

* `/sales/summary`
* `/sales/by-day`

Y renderiza datos en tiempo real desde la base de datos.

---

## 🧠 Aprendizajes

* Agregaciones en backend (analytics)
* Diseño de endpoints analíticos
* Visualización de datos en React
* Uso de Recharts
* Elección correcta de gráficos (línea vs barras)

---

## 🚧 Estado

✔ KPIs funcionando
✔ Gráfica de ventas implementada
✔ Dashboard visual completo
✔ Datos en tiempo real

---

## 🚀 Próximos pasos

### 📅 Día 7

* Filtros (fecha, producto)
* Tabla dinámica
* Mejoras UI

### 🔮 Futuro

* Crear ventas desde frontend
* Editar y eliminar datos
* Dashboard más avanzado (top productos, rankings)

---

# 📘 Día 8 - UI Mejorada y Preparación para Módulos

## 🎯 Objetivo

Mejorar la experiencia de usuario del dashboard y preparar la aplicación para escalar a nuevas secciones (Customers y Products).

---

## 🧱 Tecnologías usadas

* React
* TypeScript
* Recharts
* FastAPI

---

## ⚙️ Tareas realizadas

### 🎛️ Mejora de filtros

Se optimizó el sistema de filtros:

* Conexión centralizada desde `SalesPage`
* Estado global compartido entre componentes
* Actualización dinámica de:

  * KPIs
  * Gráfica
  * Datos

---

### 🔄 Reactividad completa

Se implementó:

```tsx
useEffect(() => {
  loadData();
}, [filters]);
```

Esto permite que cualquier cambio en los filtros actualice automáticamente los datos.

---

### 🧠 Arquitectura mejorada

Se reorganizó la lógica:

* `SalesPage` controla el estado
* `Filter` envía datos
* `KPICards` y `SalesChart` consumen filtros

---

### ⚡ UX mejorada

Se añadieron mejoras visuales:

* Separación de componentes
* Layout más limpio
* Feedback de carga básico

---

## 🧠 Aprendizajes

* Estado compartido en React
* Flujo de datos entre componentes
* Arquitectura frontend escalable
* Debugging de props (`onFilter`)
* Manejo de efectos con dependencias

---

## 🚧 Estado

✔ Dashboard interactivo
✔ Filtros funcionales
✔ Componentes conectados
✔ Base preparada para escalar

---

## 🚀 Próximos pasos

### 📅 Día 9

* Página de Customers (READ)
* Página de Products (READ)

### 📅 Día 10+

* CRUD completo (POST, DELETE, UPDATE)
* Formularios
* Interacción con base de datos

---

## 🔮 Futuro

* Autenticación (login)
* Deploy (frontend + backend)
* Dashboard más avanzado

---
# 📘 Día 9 - Customers y Products (READ)

## 🎯 Objetivo

Ampliar la aplicación creando nuevas secciones para gestionar datos de clientes y productos, enfocándose únicamente en la lectura (READ).

---

## 🧱 Tecnologías usadas

* React
* TypeScript
* FastAPI
* Axios

---

## ⚙️ Tareas realizadas

### 👤 Página de Customers

Se creó una nueva página para mostrar clientes:

* Consumo del endpoint:

```http
GET /customers
```

* Visualización en tabla con:

  * Nombre
  * Email
  * País

---

### 📦 Página de Products

Se implementó una página para productos:

* Consumo del endpoint:

```http
GET /products
```

* Visualización en tabla con:

  * Nombre
  * Categoría
  * Precio

---

### 🌐 Servicios frontend

Se crearon servicios para separar la lógica de API:

* `customerService.ts`
* `productService.ts`

Ejemplo:

```ts
export const getCustomers = async () => {
  const res = await api.get("/customers");
  return res.data;
};
```

---

### 🧠 Arquitectura consistente

Se reutilizó el patrón ya aplicado en ventas:

* `useEffect` para cargar datos
* `useState` para almacenar resultados
* Renderizado dinámico en tablas

---

### 🧭 Navegación entre páginas

Se implementó un sistema de navegación basado en estado:

* Dashboard (Sales)
* Customers
* Products

```tsx
const [activePage, setActivePage] = useState("sales");
```

Renderizado condicional:

```tsx
{activePage === "customers" && <CustomersPage />}
```

---

## 🧠 Aprendizajes

* Reutilización de patrones en React
* Separación de lógica (services vs UI)
* Consumo de APIs REST
* Renderizado dinámico de datos
* Gestión básica de navegación sin router

---

## 🚧 Estado

✔ Dashboard funcional
✔ Customers (READ)
✔ Products (READ)
✔ Navegación implementada
✔ Estructura escalable

---

## 🚀 Próximos pasos

### 📅 Día 10

* Crear clientes desde frontend (POST)
* Crear productos desde frontend (POST)

### 📅 Día 11+

* Eliminar registros (DELETE)
* Editar datos (UPDATE)

---

## 🔮 Futuro

* Mejoras UI (diseño, estilos)
* Formularios avanzados
* Validaciones
* Deploy de la aplicación

---
# 📘 Día 11 - Mejoras UX en CRUD (Customers & Products)

## 🎯 Objetivo

Mejorar la experiencia de usuario y la robustez del CRUD implementado en Customers y Products.

---

## 🧱 Tecnologías usadas

* React
* TypeScript
* FastAPI
* Axios

---

## ⚙️ Tareas realizadas

### ❌ Confirmación antes de eliminar

Se añadió una verificación para evitar eliminaciones accidentales:

```ts
window.confirm("¿Estás seguro de que deseas eliminar este registro?");
```

---

### 🧠 Validaciones en formularios

Se implementaron validaciones básicas:

* Campos obligatorios
* Email válido (Customers)
* Precio mayor a 0 (Products)

---

### 🔄 Gestión de estado mejorada

Se añadió control de carga (`loading`) para:

* Evitar múltiples envíos
* Mejorar la estabilidad de la aplicación

---

### 💬 Feedback al usuario

Se añadieron mensajes:

* Cliente creado / actualizado
* Producto creado / actualizado
* Eliminación exitosa

---

### 🧼 Limpieza del formulario

* Reset automático tras crear/editar
* Botón para cancelar edición

---

### 🔁 Reutilización del formulario

* El mismo formulario se usa para:

  * Crear
  * Editar
* Cambio dinámico del botón (Crear / Actualizar)

---

### ⚡ Manejo de errores

* Uso de `try/catch` en operaciones críticas
* Prevención de bloqueos en `loading`

---

## 🧠 Aprendizajes

* Validación de formularios en frontend
* Mejora de experiencia de usuario
* Control de estados asíncronos
* Prevención de errores comunes
* Flujo completo de interacción usuario → backend

---

## 🚧 Estado

✔ CRUD completo
✔ UX mejorada
✔ Validaciones básicas
✔ Feedback al usuario
✔ Aplicación estable

---

## 🚀 Próximos pasos

### 📅 Día 12

* Refactor del código (separar componentes)
* Mejora visual (UI más profesional)

### 📅 Día 13+

* Filtros avanzados
* Optimización de rendimiento
* Preparación para deploy

---

## 🔮 Futuro

* Autenticación de usuarios
* Roles (admin/user)
* Dashboard más avanzado
* Deploy en producción

---

# 📅 Día 15 - Dashboard de Ventas (Nivel ERP)

## 🚀 Objetivo del día

Hoy hemos evolucionado el proyecto hacia un sistema más profesional, implementando la gestión completa de ventas y un dashboard con métricas reales.

---

## 🧩 Funcionalidades implementadas

### 🛒 CRUD completo de ventas

* Crear ventas
* Editar ventas
* Eliminar ventas
* Listado de ventas en tabla reutilizable

Se ha reutilizado el componente `Table`, manteniendo consistencia con clientes y productos.

---

### 🧠 Hook personalizado `useSales`

Se ha centralizado toda la lógica de ventas:

* Carga de ventas, clientes y productos
* Funciones de creación, edición y eliminación
* Gestión del estado y loading

Esto mejora:

* 🔹 Reutilización
* 🔹 Escalabilidad
* 🔹 Separación de responsabilidades

---

### 📝 Formulario inteligente (`SaleForm`)

* Permite crear y editar ventas
* Autocompleta datos en modo edición
* Calcula el total automáticamente (precio × cantidad)
* Maneja estado interno del formulario

---

### 📊 KPIs reales

Se han implementado métricas dinámicas basadas en datos reales:

* 💰 **Total de ventas**
* 📅 **Ventas del día**
* 🏆 **Producto más vendido**

Toda la lógica se ha separado en:

```
utils/kpis.ts
```

Buenas prácticas aplicadas:

* Separación de lógica de negocio
* Cálculos reutilizables
* Código limpio y mantenible

---

## 🏗️ Arquitectura aplicada

Estructura basada en buenas prácticas:

```
/hooks
  useSales.ts

/components
  /sales
    SaleForm.tsx
  /common
    Table.tsx
  KPICards.tsx

/utils
  kpis.ts

/pages
  SalesPage.tsx
```

---

## 🔥 Mejores prácticas aplicadas

* ✔️ Reutilización de componentes
* ✔️ Separación lógica/UI
* ✔️ Hooks personalizados
* ✔️ Cálculos desacoplados (utils)
* ✔️ Código escalable tipo ERP

---

## 📈 Estado actual del proyecto

El sistema ya permite:

* Gestión completa de clientes
* Gestión completa de productos
* Gestión completa de ventas
* Dashboard con métricas reales

👉 El proyecto ha pasado de CRUD básico a un **mini ERP funcional**

---

## 🚀 Próximos pasos

* Filtros avanzados (fecha, cliente, producto)
* Gráficos con datos reales
* KPIs más avanzados (ticket medio, ventas por mes)
* Mejora visual (UI/UX)

---

## 💬 Conclusión

Hoy ha sido un salto importante:

Pasamos de manejar datos a **interpretarlos**, lo que convierte el proyecto en una herramienta de negocio real.

---
