import React, {useState} from 'react';
import './App.css';
import {NFDRDResult, NFRDService} from "./NFRDService";

function App() {
    const [inputData, setInputData] = useState('');
    const [analysisResult, setAnalysisResult] = useState<NFDRDResult>(
        {
            isRumor: false,
            confidence: 0,
            prediction: -1
        }
    );

    return (
        <div className="app-container">
            <h1>NFRD</h1>
            <div className="input-container">
                <label htmlFor="inputData">Enter Text</label>
                <textarea
                    id="inputData"
                    value={inputData}
                    onChange={(e) => setInputData(e.target.value)}
                    placeholder="Type your text here..."
                />
            </div>
            <button className="analyze-button" onClick={async () => {
                await NFRDService(inputData, setAnalysisResult);
            }}>
                Analyze
            </button>
            {analysisResult.prediction !== -1 && (
                <div className="result-container">
                    <h2>Analysis Result</h2>
                    <div className={analysisResult.isRumor ? 'result-true' : 'result-false'}>
                        <p>{analysisResult.isRumor ? 'Rumor' : 'Real News'}</p>
                        <p>{analysisResult.confidence.toFixed(1)}%</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;
