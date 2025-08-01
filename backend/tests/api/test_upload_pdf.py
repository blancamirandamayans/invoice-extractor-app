from fastapi.testclient import TestClient
from backend.main import app

client = TestClient(app)

def test_upload_pdf():
    with open("backend/tests/data/sample-invoice.pdf", "rb") as f:
        response = client.post("/api/upload/", files={"file": f})
    assert response.status_code == 200
    data = response.json()
    assert data["supplier"] == "CPB CPB SOFTWARE (GERMANY) GMBH"
    assert data["date"] == "2024-03-01"
    assert data["total_amount"] == 453.53
    assert data["currency"] == "EUR"