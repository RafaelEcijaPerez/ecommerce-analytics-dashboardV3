from pydantic import BaseModel

class CustomerCreate(BaseModel):
    name: str
    email: str

class CustomerUpdate(BaseModel):
    name: str = None
    email: str = None

class DeleteCustomer(BaseModel):
    customer_id: int
