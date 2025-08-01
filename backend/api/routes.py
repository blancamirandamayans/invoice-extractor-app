import tempfile
from fastapi import File, UploadFile
from fastapi.routing import APIRouter
from backend.services.mindee import MindeeService
from backend.api.responses import InvoiceDataResponse

router = APIRouter()

@router.post("/upload/", response_model=InvoiceDataResponse)    
async def upload_pdf(file: UploadFile = File(...)) -> InvoiceDataResponse:
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    mindee_service = MindeeService()
    result = mindee_service.extract_invoice_data(tmp_path)
    return InvoiceDataResponse(
        supplier=result.supplier,
        date=result.date,
        total_amount=result.total_amount,
        currency=result.currency,
    )
