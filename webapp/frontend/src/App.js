import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [inputData, setInputData] = useState('');
  const [response, setResponse] = useState('');

  const analyze = async () => {
    try {
      const backendResponse = await fetch('http://localhost:8080/process', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: inputData }),
      });

      const responseData = await backendResponse.json();
      setResponse(responseData.message);
    } catch (error) {
      console.error('Error sending data to backend:', error);
      setResponse('Error: Unable to connect to the backend.');
    }
  };

  return (
    <div className="app-container">
      <h1>Simple Web App</h1>
      <div>
        <label htmlFor="inputData">Input Data:</label>
        <input
          type="text"
          id="inputData"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
        />
      </div>
      <button onClick={analyze}>Analyze</button>
      <div>
        <h2>Analysis results</h2>
        <textarea value={response} readOnly />
      </div>
    </div>
  );
};

export default App;
