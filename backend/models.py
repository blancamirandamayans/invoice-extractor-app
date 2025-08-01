from pydantic import BaseModel

class InvoiceData(BaseModel):
    supplier: str
    date: str
    total_amount: float
    currency: str