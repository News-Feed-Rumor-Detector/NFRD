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

        console.log('Response from API:', result);

        if (result && 'isRumor' in result && 'label_0_probability' in result && 'label_1_probability' in result) {
            const analysisResult = result.isRumor
                ? `This might be a rumor. Probability: ${result.label_1_probability}`
                : `No indication of a rumor. Probability: ${result.label_0_probability}`;

            console.log('Analysis Result:', analysisResult);

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
