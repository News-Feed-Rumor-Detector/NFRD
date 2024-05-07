import React from 'react';

export const NFRDService = async (inputData: string, setAnalysisResult: React.Dispatch<React.SetStateAction<string>>) => {
    try {
        const response = await fetch('http://localhost:8081/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: inputData }),
        });

        const result = await response.json();

        // Check if the response contains expected properties
        if ('isRumor' in result && 'confidence' in result && 'prediction' in result) {
            const analysisResult = result.isRumor
                ? `This might be a rumor. Confidence: ${result.confidence}`
                : `No indication of a rumor. Confidence: ${result.confidence}`;

            setAnalysisResult(analysisResult);
        } else {
            console.error('Invalid response format:', result);
            setAnalysisResult('Error: Invalid response format.');
        }
    } catch (error) {
        console.error('Error calling API:', error);
        setAnalysisResult('Error: Unable to connect to the API.');
    }
};
