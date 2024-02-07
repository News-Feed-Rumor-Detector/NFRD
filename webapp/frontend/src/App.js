import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [inputData, setInputData] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');

  const analyzeInput = async () => {
    try {
      const backendResponse = await fetch('http://localhost:8080/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: inputData }),
      });

      const responseData = await backendResponse.json();
      setAnalysisResult(responseData.message);
    } catch (error) {
      console.error('Error analyzing input:', error);
      setAnalysisResult('Error: Unable to connect to the backend.');
    }
  };

  return (
    <div className="app-container">
      <h1>NFRD</h1>
      <div className="input-container">
        <label htmlFor="inputData">Enter Text:</label>
        <textarea
          id="inputData"
          value={inputData}
          onChange={(e) => setInputData(e.target.value)}
          placeholder="Type your text here..."
        />
      </div>
      <button onClick={analyzeInput}>Analyze</button>
      <div className="result-container">
        <h2>Analysis Result:</h2>
        <p>{analysisResult}</p>
      </div>
    </div>
  );
};

export default App;
