const axios = require('axios');

const callHuggingFaceAPI = async (inputData) => {
  const apiUrl = 'https://api-inference.huggingface.co/models/AbdelrahmanMosly1/BERT-Merged-Dataset';
  const authToken = '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';

  const headers = {
    'Authorization': `Bearer ${authToken}`,
  };

  try {
    const response = await axios.post(apiUrl, { text: inputData }, { headers });
  
    // Handle specific HTTP status codes
    if (response.status === 503) {
      throw new Error(`Model is currently loading. Please try again later. Estimated time: ${result.estimated_time} seconds.`);
    } else if (response.status === 429) {
      throw new Error('Too Many Requests');
    }
    const responseData = response.data;

    // Check if the response data contains an array with at least two elements
    if (!Array.isArray(responseData) || responseData.length < 2) {
      throw new Error('Invalid response format: Missing label information.');
    }

    // Interpret probabilities and determine the result
    const result = interpretProbabilities(responseData);

    return result;
  } catch (error) {
    console.error('Error calling Hugging Face API:', error);
    throw new Error('Unable to connect to the Hugging Face API.');
  }
};

// Function to interpret probabilities and determine result
const interpretProbabilities = (response) => {
  const threshold = 0.5; // Adjust this threshold based on your model's characteristics

  const label_0_index = response.findIndex(label => label.label === 'LABEL_0');
  const label_1_index = response.findIndex(label => label.label === 'LABEL_1');

  // Ensure that both labels are found in the response
  if (label_0_index === -1 || label_1_index === -1) {
    throw new Error('Invalid response format: Missing label information.');
  }

  // Extract probabilities based on label order in the response
  const label_0_probability = response[label_0_index].score;
  const label_1_probability = response[label_1_index].score;

  // Determine the result based on the threshold
  const isRumor = label_1_probability > threshold;

  return {
    isRumor,
    label_0_probability,
    label_1_probability,
  };
};

module.exports = {
  callHuggingFaceAPI,
};
