from app.database import SessionLocal
from app.models.product import Product

#CRUD 
#Todos los productos que se encuentran en la base de datos
def get_products():
    db = SessionLocal()
    products = db.query(Product).all()
    db.close()
    return products

#Obtener un producto por su ID
def get_product_by_id(product_id: int):
    db = SessionLocal()
    product = db.query(Product).filter(Product.product_id == product_id).first()
    db.close()
    return product

def get_product_by_name(product_name: str):
    db = SessionLocal()
    product = db.query(Product).filter(Product.product_name == product_name).first()
    db.close()
    return product

def get_product_by_category(category: str):
    db = SessionLocal()
    products = db.query(Product).filter(Product.category == category).all()
    db.close()
    return products

def get_categories():
    db = SessionLocal()
    categories = db.query(Product.category).distinct().all()
    db.close()
    return [cat[0] for cat in categories]

def get_product_by_price_range(min_price: float, max_price: float):
    db = SessionLocal()
    products = db.query(Product).filter(Product.price >= min_price, Product.price <= max_price).all()
    db.close()
    return products

def create_product(product_name: str, category: str, price: float):
    db = SessionLocal()
    new_product = Product(product_name=product_name, category=category, price=price)
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    db.close()
    return new_product

def update_product(product_id: int, product_name: str = None, category: str = None, price: float = None):
    db = SessionLocal()
    product = db.query(Product).filter(Product.product_id == product_id).first()
    if not product:
        db.close()
        return None
    if product_name:
        product.product_name = product_name
    if category:
        product.category = category
    if price is not None:
        product.price = price
    db.commit()
    db.refresh(product)
    db.close()
    return product

def delete_product(product_id: int):
    db = SessionLocal()
    product = db.query(Product).filter(Product.product_id == product_id).first()
    if not product:
        db.close()
        return None
    db.delete(product)
    db.commit()
    db.close()
    return product
