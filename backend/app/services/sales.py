from app.database import SessionLocal
from app.models.sale import Sale
from sqlalchemy import func
from sqlalchemy.orm import joinedload

def serialize_sale(sale):
    if not sale:
        return None
    return {
        "sale_id": sale.sale_id,
        "product_name": sale.product.product_name if sale.product else None,
        "customer_name": sale.customer.customer_name if sale.customer else None,
        "date": sale.date.date.isoformat() if sale.date else None,
        "quantity": sale.quantity,
        "total_amount": float(sale.total_amount) if sale.total_amount is not None else None,
    }

def get_sales():
    db = SessionLocal()
    sales = db.query(Sale).options(joinedload(Sale.product), joinedload(Sale.date), joinedload(Sale.customer)).all()
    result = [serialize_sale(sale) for sale in sales]
    db.close()
    return result

def get_sales_with_details():
    db = SessionLocal()
    sales = db.query(Sale).options(joinedload(Sale.product), joinedload(Sale.date), joinedload(Sale.customer)).all()
    result = [serialize_sale(sale) for sale in sales]
    db.close()
    return result

def get_sales_summary():
    db = SessionLocal()
    total_sales = db.query(Sale).count()
    total_revenue = db.query(func.sum(Sale.total_amount)).scalar()
    avg_ticket = db.query(func.avg(Sale.total_amount)).scalar()
    db.close()
    return {
        "total_sales": total_sales,
        "total_revenue": total_revenue,
        "avg_ticket": avg_ticket
    }


def get_sale_by_id(sale_id: int):
    db = SessionLocal()
    sale = db.query(Sale).options(joinedload(Sale.product), joinedload(Sale.date), joinedload(Sale.customer)).filter(Sale.sale_id == sale_id).first()
    result = serialize_sale(sale)
    db.close()
    return result

def get_sales_by_product_id(product_id: int):
    db = SessionLocal()
    sales = db.query(Sale).options(joinedload(Sale.product), joinedload(Sale.date), joinedload(Sale.customer)).filter(Sale.product_id == product_id).all()
    result = [serialize_sale(sale) for sale in sales]
    db.close()
    return result

def get_sales_by_date_id(date_id: int):
    db = SessionLocal()
    sales = db.query(Sale).options(joinedload(Sale.product), joinedload(Sale.date), joinedload(Sale.customer)).filter(Sale.date_id == date_id).all()
    result = [serialize_sale(sale) for sale in sales]
    db.close()
    return result

def get_sales_by_amount_range(min_amount: float, max_amount: float):
    db = SessionLocal()
    sales = db.query(Sale).options(joinedload(Sale.product), joinedload(Sale.date), joinedload(Sale.customer)).filter(Sale.total_amount >= min_amount, Sale.total_amount <= max_amount).all()
    result = [serialize_sale(sale) for sale in sales]
    db.close()
    return result

def get_sales_by_quantity_range(min_quantity: int, max_quantity: int):
    db = SessionLocal()
    sales = db.query(Sale).options(joinedload(Sale.product), joinedload(Sale.date), joinedload(Sale.customer)).filter(Sale.quantity >= min_quantity, Sale.quantity <= max_quantity).all()
    result = [serialize_sale(sale) for sale in sales]
    db.close()
    return result

def get_sales_grouped_by_date():
    db = SessionLocal()
    sales = db.query(Sale).options(joinedload(Sale.product), joinedload(Sale.date), joinedload(Sale.customer)).all()
    
    # Agrupar ventas por fecha
    sales_by_date = {}
    for sale in sales:
        date_str = sale.date.date.isoformat() if sale.date else "Sin fecha"
        if date_str not in sales_by_date:
            sales_by_date[date_str] = 0
        sales_by_date[date_str] += float(sale.total_amount) if sale.total_amount else 0
    
    # Convertir a lista ordenada
    result = [{"date": date, "total": total} for date, total in sorted(sales_by_date.items())]
    db.close()
    return result

def get_sales_summary():
    db = SessionLocal()
    total_sales = db.query(Sale).count()
    total_revenue = db.query(func.sum(Sale.total_amount)).scalar()
    avg_ticket = db.query(func.avg(Sale.total_amount)).scalar()
    db.close()
    return {
        "total_sales": total_sales,
        "total_revenue": total_revenue,
        "avg_ticket": avg_ticket
    }


def create_sale(product_id: int, date_id: int, quantity: int, total_amount: float):
    db = SessionLocal()
    new_sale = Sale(product_id=product_id, date_id=date_id, quantity=quantity, total_amount=total_amount)
    db.add(new_sale)
    db.commit()
    db.refresh(new_sale)
    sale = db.query(Sale).options(joinedload(Sale.product), joinedload(Sale.date), joinedload(Sale.customer)).filter(Sale.sale_id == new_sale.sale_id).first()
    result = serialize_sale(sale)
    db.close()
    return result

def update_sale(sale_id: int, product_id: int = None, date_id: int = None, quantity: int = None, total_amount: float = None):
    db = SessionLocal()
    sale = db.query(Sale).filter(Sale.sale_id == sale_id).first()
    if not sale:
        db.close()
        return None
    if product_id:
        sale.product_id = product_id
    if date_id:
        sale.date_id = date_id
    if quantity is not None:
        sale.quantity = quantity
    if total_amount is not None:
        sale.total_amount = total_amount
    db.commit()
    sale = db.query(Sale).options(joinedload(Sale.product), joinedload(Sale.date), joinedload(Sale.customer)).filter(Sale.sale_id == sale_id).first()
    result = serialize_sale(sale)
    db.close()
    return result

def delete_sale(sale_id: int):
    db = SessionLocal()
    sale = db.query(Sale).options(joinedload(Sale.product), joinedload(Sale.date), joinedload(Sale.customer)).filter(Sale.sale_id == sale_id).first()
    if not sale:
        db.close()
        return None
    result = serialize_sale(sale)
    db.delete(sale)
    db.commit()
    db.close()
    return result
