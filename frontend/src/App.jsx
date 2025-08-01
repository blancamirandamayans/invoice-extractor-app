import { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const uploadFile = async () => {
    if (!file) {
      setError("Por favor seleccione un archivo");
      return;
    }
    setError(null);
    try{
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("http://localhost:8000/upload/", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Error al procesar el archivo");
      }
      const result = await res.json();
      setData(result);
    } catch (err) {
      setError("Error al procesar el archivo");
    }
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
      {error && (
        <div className='error'>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}

export default App;
