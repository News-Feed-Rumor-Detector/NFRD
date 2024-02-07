const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(bodyParser.json());

// Function to simulate rumor detection (placeholder)
const detectRumor = () => {
  // Simulate a 70% chance of detecting a rumor
  return Math.random() < 0.7;
};

app.post('/analyze', (req, res) => {
  const inputData = req.body.data;

  // Simulate the model (replace with the actual model later)
  const isRumor = detectRumor();

  // Placeholder response
  const responseData = {
    isRumor,
    message: isRumor ? 'This might be a rumor.' : 'No indication of a rumor.',
  };

  res.json(responseData);
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
