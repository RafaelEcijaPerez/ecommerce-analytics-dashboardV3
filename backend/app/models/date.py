from sqlalchemy import Column, Date, Integer, String
from app.database import Base

class DateDim(Base):
    __tablename__ = "dim_date"

    date_id = Column(Integer, primary_key=True, index=True)
    date = Column(Date, nullable=False)
    year = Column(Integer)
    month = Column(Integer)
    day = Column(Integer)
    day_of_week = Column(String)