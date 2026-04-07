from fastapi import APIRouter
from app.services.product import get_products,  get_product_by_id, get_product_by_name, get_product_by_category, get_product_by_price_range, create_product, update_product, delete_product 
from app.database import SessionLocal

router = APIRouter(prefix="/products", tags=["products"])

@router.get("/")
def read_products():
    return get_products()

@router.get("/{product_id}")
def read_product_by_id(product_id: int):
    return get_product_by_id(product_id)

@router.get("/name/{product_name}")
def read_product_by_name(product_name: str):
    return get_product_by_name(product_name)

@router.get("/category/{category}")
def read_product_by_category(category: str):
    return get_product_by_category(category)

@router.get("/price-range")
def read_product_by_price_range(min_price: float, max_price: float):
    return get_product_by_price_range(min_price, max_price) 

@router.post("/")
def create_new_product(product_name: str, category: str, price: float):
    return create_product(product_name, category, price)

@router.put("/{product_id}")
def update_existing_product(product_id: int, product_name: str = None, category: str= None, price: float = None):
    return update_product(product_id, product_name, category, price)

@router.delete("/{product_id}")
def delete_existing_product(product_id: int):
    return delete_product(product_id)
