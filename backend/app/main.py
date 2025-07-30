from fastapi import FastAPI
from contextlib import asynccontextmanager
from starlette.middleware.cors import CORSMiddleware
from http import HTTPStatus

from app.db.creation import create_db_and_tables
from app.routers.accounts import router as accounts_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(accounts_router)

@asynccontextmanager
async def lifespan(fastapi_app: FastAPI):
    create_db_and_tables()

@app.get("/healthcheck", status_code=HTTPStatus.OK)
def healthcheck():
    return {"status": "ok"}
