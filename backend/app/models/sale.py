from sqlalchemy import Column, Integer, ForeignKey, Numeric, Date
from app.database import Base
from sqlalchemy.orm import relationship
from app.models.product import Product
from app.models.customer import Customer
from app.models.date import DateDim

class Sale(Base):
    __tablename__ = "fact_sales"

    sale_id = Column(Integer, primary_key=True, index=True)

    date_id = Column(Integer, ForeignKey("dim_date.date_id"))
    customer_id = Column(Integer, ForeignKey("dim_customer.customer_id"))
    product_id = Column(Integer, ForeignKey("dim_product.product_id"))

    quantity = Column(Integer)
    total_amount = Column(Numeric(12, 2))

    product = relationship(Product)
    date = relationship(DateDim)
    customer = relationship(Customer)
