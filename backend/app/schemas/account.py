from sqlmodel import SQLModel, Field

class Account(SQLModel, table=True):
    account_number: int = Field(primary_key=True)
    balance: float = Field(default=0.0)

class AmountRequest(SQLModel):
    amount: float

class AmountResponse(SQLModel):
    account_number: int
    balance: float