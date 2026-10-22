from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base, get_db
from .schemas import Product, ProductCreate, Order, OrderCreate
from .models import Product as ProductModel, Order as OrderModel

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Sklep API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"status": "ok"}

@app.get("/hello/{name}")
async def say_hello(name: str):
    return {"message": f"Hello {name}"}

@app.post("/products", response_model=Product)
def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    db_product = ProductModel(**product.model_dump())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product # FastAPI zserializuje to przez Product

@app.get("/products", response_model=list[Product])
def get_products(db: Session = Depends(get_db)):
    return db.query(ProductModel).all()

@app.get("/products/{productId}", response_model=Product)
def get_proucts(productId: int, db: Session = Depends(get_db)):
    order = db.query(ProductModel).filter(ProductModel.id == productId).first()
    if not order:
        raise HTTPException(status_code=404, detail="Product not found")
    return order

@app.post("/orders", response_model=Order)
def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    db_order = OrderModel(**order.model_dump())
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

@app.get("/orders", response_model=list[Order])
def get_orders(db: Session = Depends(get_db)):
    return db.query(OrderModel).all()

@app.get("/orders/{orderId}", response_model=Order)
def get_order(orderId: int, db: Session = Depends(get_db)):
    order = db.query(OrderModel).filter(OrderModel.id == orderId).first()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order