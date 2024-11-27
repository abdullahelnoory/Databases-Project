// run : node test.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const app = express();
const port = 6969;

app.use(express.json());
app.use(cors());

const pool = new Pool({
  user: 'postgres',  
  host: 'localhost',        
  database: 'Learn',  
  password: '12345678',  
  port: 5432,                 
});

app.get('/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM learn');
    res.json({
      data: result.rows
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
    });
  }
});

app.post('/endpoint', (req, res) => {
  const receivedData = req.body;
  console.log('Data received from frontend:', receivedData.text);

  res.json({
    success: true,
    message: 'Data received successfully!',
    receivedData,
  });
});

app.get('/', (req, res) => {
  res.send('Hello from back end!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
