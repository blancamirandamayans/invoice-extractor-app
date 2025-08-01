import os
from dataclasses import dataclass
from mindee import Client
from mindee.product import InvoiceV4
from dotenv import load_dotenv
from models import InvoiceData

load_dotenv()

@dataclass
class MindeeService:
    mindee_client = Client(api_key=os.getenv("MINDEE_API_KEY"))

    def extract_invoice_data(self, file_path: str) -> InvoiceData:
        input_doc = self.mindee_client.source_from_path(file_path)
        result = self.mindee_client.parse(InvoiceV4, input_doc).document.inference.prediction
        return InvoiceData(
            supplier=result.supplier_name.value,
            date=str(result.date.value),
            total_amount=result.total_amount.value,
            currency=result.locale.currency,
        )
