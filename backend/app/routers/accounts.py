from fastapi import APIRouter, HTTPException
from sqlmodel import Session
from http import HTTPStatus

from app.schemas.account import Account, AmountRequest, AmountResponse
from app.db.creation import get_engine

router = APIRouter(tags=["accounts"])

@router.get("/accounts/{account_number}/balance", response_model=AmountResponse)
def get_balance(account_number: int):
    with Session(get_engine()) as session:
        account = session.get(Account, account_number)
        if not account:
            raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="Account not found")
        return AmountResponse(account_number=account.account_number, balance=account.balance)

@router.post("/accounts/{account_number}/deposit", response_model=AmountResponse)
def deposit(account_number: int, request: AmountRequest):
    with Session(get_engine()) as session:
        account = session.get(Account, account_number)
        if not account:
            account = Account(account_number=account_number, balance=request.amount)
        else:
            account.balance += request.amount
        session.add(account)
        session.commit()
        session.refresh(account)
        return AmountResponse(account_number=account.account_number, balance=account.balance)

@router.post("/accounts/{account_number}/withdraw", response_model=AmountResponse)
def withdraw(account_number: int, request: AmountRequest):
    with Session(get_engine()) as session:
        account = session.get(Account, account_number)
        if not account:
            raise HTTPException(status_code=HTTPStatus.NOT_FOUND, detail="Account not found")
        if request.amount > account.balance:
            raise HTTPException(status_code=HTTPStatus.BAD_REQUEST, detail="Insufficient funds")
        account.balance -= request.amount
        session.add(account)
        session.commit()
        session.refresh(account)
        return AmountResponse(account_number=account.account_number, balance=account.balance)