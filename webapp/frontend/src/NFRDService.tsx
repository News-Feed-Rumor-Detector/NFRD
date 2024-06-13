import React from "react";
import axios from "axios";

interface ModelResponse {
    confidence: number;
    prediction: number;
}

export interface NFRDResult {
    isRumor: boolean;
    confidence: number;
    prediction: number;
}

export const NFRDService = async (inputData: string, setAnalysisResult: React.Dispatch<React.SetStateAction<NFRDResult>>) => {
    const apiUrl = 'http://172.166.85.39'; // Azure model endpoint
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const response = await axios.get(apiUrl, {
            headers,
            data: {
                input: inputData
            }
        });
        const responseData = response.data;

        // Check if the response data contains confidence and prediction
        if (!responseData.hasOwnProperty('confidence') || !responseData.hasOwnProperty('prediction')) {
            throw new Error('Invalid response format: Missing confidence or prediction.');
        }

        // Interpret prediction
        const result = interpretPrediction(responseData);

        // Dummy data uncomment for testing and comment out the above lines
        // let rnd = Math.random();
        // const result: NFDRDResult = {
        //     confidence: parseFloat(rnd.toFixed(3)) * 100,
        //     isRumor: rnd > 0.5,
        //     prediction: rnd > 0.5 ? 1 : 0,
        // };

        if (!(result.isRumor !== undefined && result.confidence !== undefined)) {
            result.prediction = -2;
            console.error('Invalid response format:', result);
        }
        setAnalysisResult(result);
    } catch (error) {
        console.error('Error calling Azure API:', error);
        setAnalysisResult({prediction: 404, isRumor:false, confidence:0});
    }
};

// Function to interpret prediction
const interpretPrediction = (response: ModelResponse): NFRDResult => {
    // Check if response is valid
    if (!response || !response.hasOwnProperty('confidence') || !response.hasOwnProperty('prediction')) {
        throw new Error('Invalid response format: Missing confidence or prediction.');
    }

    // Check if the confidence is higher than the threshold
    const isRumor = response.prediction === 1; // 1 indicates a rumor
    const confidence: number = parseFloat(response.confidence.toFixed(3)) * 100;

    return {
        isRumor,
        confidence: confidence,
        prediction: response.prediction,
    };
};
