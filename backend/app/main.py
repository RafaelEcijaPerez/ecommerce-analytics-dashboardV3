from fastapi import FastAPI
from app.routes import sales, product, customer
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.include_router(sales.router)
app.include_router(product.router)
app.include_router(customer.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)