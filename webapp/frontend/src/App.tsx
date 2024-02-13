import React, {useState} from 'react';
import './App.css';
import {NFRDService} from "./NFRDService";

function App() {
    const [inputData, setInputData] = useState('');
    const [analysisResult, setAnalysisResult] = useState('');

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
            <button onClick={() => NFRDService(inputData, setAnalysisResult)}>Analyze</button>
            <div className="result-container">
                <h2>Analysis Result:</h2>
                <p>{analysisResult}</p>
            </div>
        </div>
    );
};

export default App;
