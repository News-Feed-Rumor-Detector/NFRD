import React, {useState} from 'react';
import './App.css';
import {NFRDResult, NFRDService} from "./NFRDService";

function App() {
    const [inputData, setInputData] = useState('');
    const [analysisResult, setAnalysisResult] = useState<NFRDResult>(
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

            <div className="result-container">
                <h2>Analysis Result</h2>
                {(analysisResult.prediction === 0 || analysisResult.prediction === 1) && (
                    <div className={analysisResult.isRumor ? 'result-true' : 'result-false'}>
                        <p>{analysisResult.isRumor ? 'Rumor' : 'Real News'}</p>
                        <p>Confidence = {analysisResult.confidence.toFixed(1)}%</p>
                    </div>
                )}
                {analysisResult.prediction === 404 && (
                    <div className={'result-true'}>
                        <p>Error: Unable to connect to the Azure API</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
