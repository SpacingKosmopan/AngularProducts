from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from ..database import get_db
from ..models import Item
from ..schemas import ItemCreate, Item as ItemSchema

router = APIRouter(prefix="/items", tags=["items"])

@router.get("/", response_model=List[ItemSchema]) # prefix="/items" od razu automatycznie podpina, nie można dublować
def list_items(db: Session = Depends(get_db)):
    return db.query(Item).all()

@router.post("/", response_model=ItemSchema)
def create_item(item: ItemCreate, db: Session = Depends(get_db)): # w 2gim arg: FastAPI wywołuje get_db(), dostarcza sesję, na końcu zamyka ją
    db_item = Item(**item.model_dump()) # zwraca zwykły obiekt Pythona (dict)
    db.add(db_item)
    db.commit() # spushowanie zmian, wymagane
    db.refresh(db_item) # odświeżenie np. kluczy podstawowych
    return db_item

@router.get("/{item_id}")
def get_item(item_id: int, db: Session = Depends(get_db)):
    return db.query(Item).filter(Item.id == item_id).first()