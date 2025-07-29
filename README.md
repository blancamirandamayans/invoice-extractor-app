# Invoice Extractor

A minimal web app to extract **Supplier**, **Date**, and **Total Amount** from PDF invoices using the **Mindee API**.

---

## 📦 Requirements

- Python 3.10+
- Node.js 18+

### Mindee API Key 
- Acess https://platform.mindee.com and login (I registered with gmail)
- Go to API keys and create a new one

---

## ⚙️ Backend Setup

```bash
cd backend
python -m venv venv
(linux) source venv/bin/activate
(windows) .\venv\Scripts\activate.bat
pip install -r requirements.txt
echo "MINDEE_API_KEY=your_key_here" > .env
uvicorn main:app --reload
```

---

## 🌐 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## ✅ Usage

1. Run both frontend and backend.
2. Open browser at `http://localhost:5173`
3. Upload a PDF invoice.
4. See extracted data

---

## 👣 Next steps
- Typing
- Error control
- Testing
- Dockerize