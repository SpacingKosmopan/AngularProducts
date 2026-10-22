from pydantic import BaseModel
from typing import Optional

class ProductCreate(BaseModel): # POST body
    name: str
    price: float
    imageSrc: str
    description: str
    reviews: list[Review] = []

class Product(ProductCreate): # response + wygenerowane id przez bazę danych
    id: int
    class Config:
        from_attributes = True

class OrderCreate(BaseModel):
    customer: str
    adress: str
    phone: str
    email: str
    date: str
    cart: list[int] # product id
    paymentMethod: str

class Order(OrderCreate):
    id: int
    class Config:
        from_attributes = True

class Review(BaseModel):
    id: int
    value: int
    content: str