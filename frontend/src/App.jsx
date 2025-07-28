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
    <div className='container'>
      <div >
        <h1>Invoice Extractor</h1>
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <br></br>
        <button
          onClick={uploadFile}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
          Upload & Extract
        </button>
      </div>
      {data && (
        <div className='result'>
          <p><strong>Supplier:</strong> {data.supplier}</p>
          <p><strong>Date:</strong> {data.date}</p>
          <p><strong>Total Amount:</strong> {data.total_amount} ({data.currency})</p>
        </div>
      )}
    </div>
  );
}

export default App;
