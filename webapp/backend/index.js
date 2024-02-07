const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

// Enable CORS
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, this is your Node.js backend!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
