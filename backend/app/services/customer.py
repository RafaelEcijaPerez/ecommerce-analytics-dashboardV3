from app.database import SessionLocal
from app.models.customer import Customer

def get_customers():
    db = SessionLocal()
    customers = db.query(Customer).all()
    db.close()
    return customers

def get_customer_by_id(customer_id: int):
    db = SessionLocal()
    customer = db.query(Customer).filter(Customer.customer_id == customer_id).first()
    db.close()
    return customer

def get_customer_by_name(customer_name: str):
    db = SessionLocal()
    customer = db.query(Customer).filter(Customer.customer_name == customer_name).first()
    db.close()
    return customer

def create_customer(customer_name: str, email: str):
    db = SessionLocal()
    new_customer = Customer(customer_name=customer_name, email=email)
    db.add(new_customer)
    db.commit()
    db.refresh(new_customer)
    db.close()
    return new_customer

def update_customer(customer_id: int, customer_name: str = None, email: str = None):
    db = SessionLocal()
    customer = db.query(Customer).filter(Customer.customer_id == customer_id).first()
    if not customer:
        db.close()
        return None
    if customer_name:
        customer.customer_name = customer_name
    if email:
        customer.email = email
    db.commit()
    db.refresh(customer)
    db.close()
    return customer

def delete_customer(customer_id: int):
    db = SessionLocal()
    customer = db.query(Customer).filter(Customer.customer_id == customer_id).first()
    if not customer:
        db.close()
        return None
    db.delete(customer)
    db.commit()
    db.close()
    return customer
