import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.db.creation import create_db_and_tables

@pytest.fixture(autouse=True, scope="module")
def setup_database():
    create_db_and_tables()

@pytest.fixture
def client():
    return TestClient(app)
