from fastapi import APIRouter
from app.services.customer import get_customers, get_customer_by_id, get_customer_by_name, create_customer, update_customer, delete_customer 
from app.database import SessionLocal

router = APIRouter(prefix="/customers", tags=["customers"])

@router.get("/")
def read_customers():
    return get_customers()

@router.get("/{customer_id}")
def read_customer_by_id(customer_id: int):
    return get_customer_by_id(customer_id)

@router.get("/name/{customer_name}")
def read_customer_by_name(customer_name: str):
    return get_customer_by_name(customer_name)  

@router.post("/create")
def create_new_customer(customer_name: str, email: str):
    return create_customer(customer_name, email)

@router.put("/{customer_id}")
def update_existing_customer(customer_id: int, customer_name: str = None, email: str = None):
    return update_customer(customer_id, customer_name, email)

@router.delete("/{customer_id}")
def delete_existing_customer(customer_id: int):
    return delete_customer(customer_id)
