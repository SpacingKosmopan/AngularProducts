from sqlalchemy import Column, Integer, String, Float
from .database import Base
from sqlalchemy.dialects.postgresql import ARRAY, JSONB

class Order(Base): # definicja tabeli w bazie SQL
    __tablename__ = "Orders"
    id = Column(Integer, primary_key=True, index=True)
    customer = Column(String, nullable=False)
    adress = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    email = Column(String, nullable=False)
    date = Column(String, nullable=False)
    cart = Column(ARRAY(Integer), nullable=False) # product id
    paymentMethod = Column(String, nullable=False)

class Product(Base):
    __tablename__ = "Products"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    imageSrc = Column(String, nullable=False)
    description = Column(String, nullable=False)
    reviews = Column(JSONB, nullable=True)