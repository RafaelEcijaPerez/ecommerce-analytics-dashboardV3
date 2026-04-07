from fastapi import APIRouter
from app.services.date import get_dates, get_date_by_id, create_date, update_date, delete_date

router = APIRouter(prefix="/dates", tags=["dates"])
@router.get("/")
def read_dates():
    return get_dates()

@router.get("/{date_id}")
def read_date_by_id(date_id: int):
    return get_date_by_id(date_id)

@router.post("/")
def create_new_date(date_value: str):
    return create_date(date_value)

@router.put("/{date_id}")
def update_existing_date(date_id: int, date_value: str):
    return update_date(date_id, date_value)

@router.delete("/{date_id}")
def delete_existing_date(date_id: int):
    return delete_date(date_id)
