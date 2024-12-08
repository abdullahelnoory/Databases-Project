const pool = require("../models/db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { fname, mname, lname, job, ssn, email, password, age, carDetails, stationDetails} = req.body;
  const saltRounds = 10;

  try {
    if (job !== "Passenger" && (isNaN(ssn) || ssn.trim() === "")) {
      return res.status(400).json({ success: false, message: "SSN must be a valid number." });
    }

    if (job === "Passenger" && (isNaN(age) || age.trim() === "")) {
      return res.status(400).json({ success: false, message: "Age must be a valid number." });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const emailCheck = await pool.query(`
      SELECT email FROM "Passenger" WHERE email = $1
      UNION
      SELECT email FROM "Admin" WHERE email = $1
      UNION
      SELECT email FROM "Manager" WHERE email = $1
      UNION
      SELECT email FROM "Driver" WHERE email = $1
    `, [email]);

    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    if (job !== "Passenger") {
      const ssnCheck = await pool.query(`
        SELECT ssn FROM "Admin" WHERE ssn = $1
        UNION
        SELECT ssn FROM "Manager" WHERE ssn = $1
        UNION
        SELECT ssn FROM "Driver" WHERE ssn = $1
      `, [ssn]);

      if (ssnCheck.rows.length > 0) {
        return res.status(400).json({ success: false, message: "SSN already exists" });
      }
    }

    let result;
    switch (job) {
      case "Admin":
        result = await pool.query(
          'INSERT INTO "Admin" (ssn, email, fname, mname, lname, password) VALUES ($1, $2, $3, $4, $5, $6)',
          [ssn, email, fname, mname, lname, hashedPassword]
        );
        break;
      case "Manager":
        result = await pool.query(
          'INSERT INTO "Manager" (ssn, email, fname, mname, lname, password, verified_by) VALUES ($1, $2, $3, $4, $5, $6, NULL)',
          [ssn, email, fname, mname, lname, hashedPassword]
        );
        await pool.query(
          'INSERT INTO "Station" (station_name, street, zipcode, governorate, m_ssn ) VALUES ($1, $2, $3, $4, $5)',
          [stationDetails.station_name, stationDetails.street, stationDetails.zipcode, stationDetails. governorate, ssn]
        );
        break;
      case "Driver":
        result = await pool.query(
          'INSERT INTO "Driver" (ssn, email, fname, mname, lname, password, is_private) VALUES ($1, $2, $3, $4, $5, $6, false)',
          [ssn, email, fname, mname, lname, hashedPassword]
        );
        await pool.query(
          'INSERT INTO "Car" (car_license, number_of_seats, air_conditioning, car_type, additional_price, d_ssn) VALUES ($1, $2, $3, $4, $5, $6)',
          [carDetails.car_license, carDetails.number_of_seats, carDetails.air_conditioning, carDetails.car_type, carDetails.additional_price, ssn]
        );
        break;
      case "Passenger":
        result = await pool.query(
          'INSERT INTO "Passenger" (email, age, fname, lname, password) VALUES ($1, $2, $3, $4, $5)',
          [email, age, fname, lname, hashedPassword]
        );
        break;
      default:
        return res.status(400).json({ success: false, message: "Invalid job type" });
    }

    res.json({ Register: true, success: true });
  } catch (error) {
    console.error("Error connecting to the database:", error);

    if (error.code === "23505") {
      res.status(400).json({
        success: false,
        message: "Duplicate entry detected",
        details: error.detail,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Database error occurred",
      });
    }
  }
};



exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let ssn;

  try {
    const result1 = await pool.query(
      'SELECT ssn, email, password FROM "Admin" WHERE email = $1',
      [email]
    );
    const result2 = await pool.query(
      'SELECT ssn, email, password, verified_by FROM "Manager" WHERE email = $1',
      [email]
    );
    const result3 = await pool.query(
      'SELECT ssn, email, password FROM "Driver" WHERE email = $1',
      [email]
    );
    const result4 = await pool.query(
      'SELECT id, email, password FROM "Passenger" WHERE email = $1',
      [email]
    );

    let user = null;
    let userType = null;

    if (result1.rows.length === 1) {
      user = result1.rows[0];
      ssn = user.ssn
      userType = "Admin";
    } else if (result2.rows.length === 1) {
      user = result2.rows[0];
      ssn = user.ssn
      userType = "Manager";
    } else if (result3.rows.length === 1) {
      user = result3.rows[0];
      ssn = user.ssn
      userType = "Driver";
    } else if (result4.rows.length === 1) {
      user = result4.rows[0];
      ssn = user.id
      userType = "Passenger";
    }

    if (!user) {
      console.log("Login Failed, Wrong Email");
      return res.json({ login: false, success: true });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    
    if (passwordMatch) {
      const token = jwt.sign(
        { ssn: ssn, userType: userType },
        'your_secret_key', 
        { expiresIn: '1h' }
      );      
      res.json({
        login: true,
        success: true,
        token: token,
        type: userType,
        ssn: ssn
      });
    } else {
      res.json({ login: false, success: true });
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
};
