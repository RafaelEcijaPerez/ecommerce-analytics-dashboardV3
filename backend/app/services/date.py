from app.database import SessionLocal
from app.models.date import Date

def get_dates():
    db = SessionLocal()
    dates = db.query(Date).all()
    db.close()
    return dates

def get_date_by_id(date_id: int):
    db = SessionLocal()
    date = db.query(Date).filter(Date.date_id == date_id).first()
    db.close()
    return date

def create_date(date_value: str):
    db = SessionLocal()
    new_date = Date(date_value=date_value)
    db.add(new_date)
    db.commit()
    db.refresh(new_date)
    db.close()
    return new_date

def update_date(date_id: int, date_value: str):
    db = SessionLocal()
    date = db.query(Date).filter(Date.date_id == date_id).first()
    if not date:
        db.close()
        return None
    date.date_value = date_value
    db.commit()
    db.refresh(date)
    db.close()
    return date

def delete_date(date_id: int):
    db = SessionLocal()
    date = db.query(Date).filter(Date.date_id == date_id).first()
    if not date:
        db.close()
        return None
    db.delete(date)
    db.commit()
    db.close()
    return date
