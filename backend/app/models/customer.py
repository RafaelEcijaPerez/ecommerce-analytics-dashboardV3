from sqlalchemy import Column, Integer, String
from app.database import Base

class Customer(Base):
    __tablename__ = "dim_customer"

    customer_id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String)
    email = Column(String, unique=True)