from sqlalchemy import Column, Integer, String, Numeric
from app.database import Base

class Product(Base):
    __tablename__ = "dim_product"

    product_id = Column(Integer, primary_key=True, index=True)
    product_name = Column(String)
    category = Column(String)
    price = Column(Numeric(10, 2))