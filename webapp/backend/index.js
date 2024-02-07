const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const rumorDetector = require('./rumorDetector');

const app = express();
const port = 8080;

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(bodyParser.json());

app.post('/analyze', async (req, res) => {
  const inputData = req.body.data;

  // Use the rumorDetector module
  const result = await rumorDetector.analyzeRumor(inputData);

  // Send the response
  res.json(result);
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
