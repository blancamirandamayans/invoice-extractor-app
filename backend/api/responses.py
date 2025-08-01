from pydantic import BaseModel

class InvoiceDataResponse(BaseModel):
    supplier: str
    date: str
    total_amount: float
    currency: str
