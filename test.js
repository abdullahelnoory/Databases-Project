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

app.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const saltRounds = 10
  let hashedPassword = '';
  bcrypt.hash(password, saltRounds, (err, hash) => {
     if(err)
     {
        console.error(err);
        return;
     }
     hashedPassword = hash;
  });
  try
  {
     const result1 = pool.query('select E-mail,Password from Admin where E-mail = "' + email + '" and Password = "' + hashedPassword + '"');
     const result2 = pool.query('select E-mail,Password from Manager where E-mail = "' + email + '" and Password = "' + hashedPassword + '"');
     const result3 = pool.query('select E-mail,Password from Driver where E-mail = "' + email + '" and Password = "' + hashedPassword + '"');
     const result4 = pool.query('select E-mail,Password from Passenger where E-mail = "' + email + '" and Password = "' + hashedPassword + '"');
     if(result1.rows.length() == 0 && result2.rows.length() == 0 && result3.rows.length() == 0 && result4.rows.length() == 0)
     {
        res.json({login : false , success : true});
     }

     if(result1.rows.length() == 1)
     {
        res.json({login : true, success : true, type : 1});
     }
     else if(result2.rows.length() == 1)
     {
         res.json({login : true, success : true, type : 2});
     }
     else if(result3.rows.length() == 1)
     {
          res.json({login : true, success : true, type : 3});
     }
     else if(result4.rows.length() == 1)
     {
          res.json({login : true, success : true, type : 4});
     }
  }catch (error) {
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
