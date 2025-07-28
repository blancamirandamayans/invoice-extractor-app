from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from mindee import Client
from mindee.product import InvoiceV4
from dotenv import load_dotenv
import os
import tempfile

load_dotenv()
app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])
mindee_client = Client(api_key=os.getenv("MINDEE_API_KEY"))

@app.post("/upload/")
async def upload_pdf(file: UploadFile = File(...)):
    # Save upload to temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
        tmp.write(await file.read())
        tmp_path = tmp.name

    # Wrap using Mindee SDK helper
    input_doc = mindee_client.source_from_path(tmp_path)

    # Parse Invoice
    result = mindee_client.parse(InvoiceV4, input_doc).document.inference.prediction

    return {
        "supplier": result.supplier_name.value,
        "date": str(result.date.value),
        "total_amount": result.total_amount.value,
    }
