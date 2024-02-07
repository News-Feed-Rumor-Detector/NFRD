const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(bodyParser.json());

app.post('/process', (req, res) => {
  const inputData = req.body.data;
  
  // Simple processing (replace with your own logic)
  const responseData = { message: `Received and processed: ${inputData}` };
  
  res.json(responseData);
});

app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
