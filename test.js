
// run : node test.js
const express = require('express');
const app = express();
const port = 6969; 


app.get('/', (req, res) => {
  res.send('Hello from back end!');
});

app.get('/data', (req, res) => {
  const data = {
    message: 'This is some data from back end',
    timestamp: new Date().toISOString()
  };
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
