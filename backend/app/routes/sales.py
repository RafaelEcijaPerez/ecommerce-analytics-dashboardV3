from fastapi import APIRouter
from app.services.sales import get_sales,get_sales_summary, get_sales_filtered, get_sales_with_details ,get_sale_by_id, get_sales_by_product_id, get_sales_by_date_id, get_sales_by_amount_range, get_sales_by_quantity_range, get_sales_grouped_by_date, create_sale, update_sale, delete_sale
from app.database import SessionLocal

router = APIRouter(prefix="/sales", tags=["sales"])

@router.get("/")
def read_sales():
    return get_sales()

@router.get("/summary")
def read_sales_summary(start_date: str = None, end_date: str = None, category: str = None):
    return get_sales_summary(start_date, end_date, category)

@router.get("/details")
def read_sales_with_details():
    return get_sales_with_details()

@router.get("/grouped-by-date")
def read_sales_grouped_by_date(start_date: str = None, end_date: str = None, category: str = None):
    return get_sales_grouped_by_date(start_date, end_date, category)

@router.get("/{sale_id}")
def read_sale_by_id(sale_id: int):
    return get_sale_by_id(sale_id)

@router.get("/product/{product_id}")
def read_sales_by_product_id(product_id: int):
    return get_sales_by_product_id(product_id)

@router.get("/date/{date_id}")
def read_sales_by_date_id(date_id: int):
    return get_sales_by_date_id(date_id)

@router.get("/amount-range")
def read_sales_by_amount_range(min_amount: float, max_amount: float):
    return get_sales_by_amount_range(min_amount, max_amount)

@router.get("/quantity-range")
def read_sales_by_quantity_range(min_quantity: int, max_quantity: int):
    return get_sales_by_quantity_range(min_quantity, max_quantity)

@router.get("/filtered")
@router.get("/filtered")
def get_filtered_sales(
    start_date: str = None,
    end_date: str = None,
    category: str = None
):
    return get_sales_filtered(start_date, end_date, category)

@router.post("/create")
def create_new_sale(product_id: int, date_id: int, quantity: int, total_amount: float):
    return create_sale(product_id, date_id, quantity, total_amount)

@router.put("/update/{sale_id}")
def update_existing_sale(sale_id: int, product_id: int, date_id: int, quantity: int, total_amount: float):
    return update_sale(sale_id, product_id, date_id, quantity, total_amount)

@router.delete("/delete/{sale_id}")
def delete_existing_sale(sale_id: int):
    return delete_sale(sale_id)
