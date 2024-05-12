import axios from 'axios';


export const NFRDService = async (inputData: string, setAnalysisResult: React.Dispatch<React.SetStateAction<string>>) => {
    const apiUrl = 'http://172.166.85.39'; // Azure model endpoint
    const requestBody = {"input": inputData};
    const headers = {
      'Content-Type': 'application/json',
      'Content-Length': JSON.stringify(requestBody).length
    };
  
    try {
      const response = await axios.post(apiUrl, requestBody, {headers: headers});
        const responseData = response.data;

        // Check if the response data contains confidence and prediction
        if (!responseData.hasOwnProperty('confidence') || !responseData.hasOwnProperty('prediction')) {
            throw new Error('Invalid response format: Missing confidence or prediction.');
        }

        // Interpret prediction
        const result = interpretPrediction(responseData);

        if (result.isRumor !== undefined && result.confidence !== undefined) {
            const analysisResult = result.isRumor
                ? `This might be a rumor. Confidence: ${result.confidence}`
                : `No indication of a rumor. Confidence: ${result.confidence}`;

            setAnalysisResult(analysisResult);
        } else {
            console.error('Invalid response format:', result);
            setAnalysisResult('Error: Invalid response format.');
        }
    } catch (error) {
        console.error('Error calling Azure API:', error);
        setAnalysisResult('Error: Unable to connect to the Azure API.');
    }
};

interface  ModelResponse{
    confidence: number;
    prediction: number;
}


// Function to interpret prediction
const interpretPrediction = (response: ModelResponse) => {
    // Check if response is valid
    if (!response || !response.hasOwnProperty('confidence') || !response.hasOwnProperty('prediction')) {
        throw new Error('Invalid response format: Missing confidence or prediction.');
    }

    // Check if the confidence is higher than the threshold
    const isRumor = response.prediction === 1; // 1 indicates a rumor

    return {
        isRumor,
        confidence: response.confidence,
        prediction: response.prediction,
    };
};
