import os
from sqlmodel import SQLModel, create_engine


def get_engine():
    if not os.path.exists("data"):
        os.makedirs("data", exist_ok=True)
    return create_engine("sqlite:///data/atm.db", echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(get_engine())