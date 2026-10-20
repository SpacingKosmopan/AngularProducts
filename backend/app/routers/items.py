from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import Item
from ..schemas import ItemCreate, Item

router = APIRouter(prefix="/items", tags=["items"])

@router.get("/", response_model=List[Item])
def list_items(db: Session = Depends(get_db)):
    return db.query(Item).all()

@router.post("/", response_model=Item)
def create_item(item: ItemCreate, db: Session = Depends(get_db)):
    db_item = Item(**item.model_dump())
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item   