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
