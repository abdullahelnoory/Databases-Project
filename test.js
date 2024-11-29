// run : node test.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const app = express();
const port = 6969;

app.use(express.json());
app.use(cors());

const pool = new Pool({
  user: 'postgres',  
  host: 'localhost',        
  database: 'SwiftRoute',  
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

app.post('/register', async (req, res) => {
  const { fname, mname, lname, job, ssn, email, password } = req.body;
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    let result;

    switch (job) {
      case "Admin":
        result = await pool.query(
          'INSERT INTO "Admin" VALUES ($1, $2, $3, $4, $5, $6)',
          [ssn, email, fname, mname, lname, hashedPassword]
        );
        break;
      case "Manager":
        result = await pool.query(
          'INSERT INTO "Manager" VALUES ($1, $2, $3, $4, $5, $6)',
          [ssn, email, fname, mname, lname, hashedPassword]
        );
        break;
      case "Driver":
        result = await pool.query(
          'INSERT INTO "Driver" VALUES ($1, $2, $3, $4, $5, $6, false)',
          [ssn, email, fname, mname, lname, hashedPassword]
        );
        break;
      /*case "Passenger":
        result = await pool.query(
          'INSERT INTO "Passenger" VALUES ($1, $2, $3, $4, $5)',
          [email, fname, mname, lname, hashedPassword]
        );
        break;*/
      default:
        return res.json({ success: false, message: "Invalid job type" });
    }

    res.json({ Register: true, success: true });
  } catch (error) {
    console.error('Error connecting to the database:', error);

    if (error.code === '23505') {
      res.json({
        success: false,
        message: 'Duplicate entry detected',
        details: error.detail,
      });
    } else if (error.code === '23503') {
      res.json({
        success: false,
        message: 'Foreign key constraint violation',
        details: error.detail,
      });
    } else if (error.code === '23514') {
      res.json({
        success: false,
        message: 'Check constraint violated',
        details: error.detail,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Database error occurred',
      });
    }
  }
});



app.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const result1 = await pool.query('SELECT email, password FROM "Admin" WHERE email = $1', [email]);
    const result2 = await pool.query('SELECT email, password FROM "Manager" WHERE email = $1', [email]);
    const result3 = await pool.query('SELECT email, password FROM "Driver" WHERE email = $1', [email]);
    //const result4 = await pool.query('SELECT email, password FROM "Passenger" WHERE email = $1', [email]);


    let user = null;
    let userType = null;

    if (result1.rows.length === 1) {
      user = result1.rows[0];
      userType = 1;
    } else if (result2.rows.length === 1) {
      user = result2.rows[0];
      userType = 2;
    } else if (result3.rows.length === 1) {
      user = result3.rows[0];
      userType = 3;
    }

    if (!user) {
      return res.json({ login: false, success: true });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      res.json({ login: true, success: true, type: userType });
    } else {
      res.json({ login: false, success: true });
    }
  } catch (error) {
    console.error('Error connecting to the database:', error);
    res.status(500).json({
      success: false,
      message: 'Database connection failed',
    });
  }
});



app.get('/', (req, res) => {
  res.send('Hello from back end!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
