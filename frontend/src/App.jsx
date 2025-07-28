import { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("http://localhost:8000/upload/", {
      method: "POST",
      body: formData,
    });
    const result = await res.json();
    setData(result);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold mb-4">Invoice Extractor</h1>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button
        onClick={uploadFile}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Upload & Extract
      </button>
      {data && (
        <div className="mt-6 bg-white shadow p-4 rounded">
          <p><strong>Supplier:</strong> {data.supplier}</p>
          <p><strong>Date:</strong> {data.date}</p>
          <p><strong>Total Amount:</strong> {data.total_amount} ({data.currency})</p>
        </div>
      )}
    </div>
  );
}

export default App;
