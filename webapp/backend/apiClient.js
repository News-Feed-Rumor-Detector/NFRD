const axios = require('axios');

const callAzureAPI = async (inputData) => {
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

    return result;
  } catch (error) {
    console.error('Error calling Azure API:', error);
    throw new Error('Unable to connect to the Azure API.');
  }
};

// Function to interpret prediction
const interpretPrediction = (response) => {
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


module.exports = {
  callAzureAPI,
};
