import React from 'react';

export const NFRDService = async (inputData: string, setAnalysisResult: React.Dispatch<React.SetStateAction<string>>) => {
    try {
        const response = await fetch('http://localhost:8081/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({data: inputData}),
        });

        const result = await response.json();
        setAnalysisResult(result.message);
    } catch (error) {
        console.error('Error calling API:', error);
        setAnalysisResult('Error: Unable to connect to the API.');
    }
};