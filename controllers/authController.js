const pool = require("../models/db");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { fname, mname, lname, job, ssn, email, password } = req.body;
  const saltRounds = 10;
  console.log(res.body);

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
          'INSERT INTO "Manager" VALUES ($1, $2, $3, $4, $5, $6, NULL)',
          [ssn, email, fname, mname, lname, hashedPassword]
        );
        break;
      case "Driver":
        result = await pool.query(
          'INSERT INTO "Driver" VALUES ($1, $2, $3, $4, $5, $6, false);',
          [ssn, email, fname, mname, lname, hashedPassword]
        );
        await pool.query('INSERT INTO "Car" VALUES ($1, $2, $3, $4, $5, $6);', [
          req.body.carLicense,
          req.body.numberOfSeats,
          req.body.airConditioning,
          req.body.carType,
          req.body.additionalPrice,
          ssn,
        ]);
        break;
      case "Passenger":
        result = await pool.query(
          'INSERT INTO "Passenger" VALUES ($1, $2, $3, $4, $5, $6)',
          [ssn, email, req.body.age, fname, lname, hashedPassword]
        );
        break;
      default:
        return res.json({ success: false, message: "Invalid job type" });
    }

    res.json({ Register: true, success: true });
  } catch (error) {
    console.error("Error connecting to the database:", error);

    if (error.code === "23505") {
      res.json({
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
      console.log("Login Successful");
      if (userType == "Manager")
        res.json({ login: true, success: true, type: userType, user, ssn });
      else
        res.json({ login: true, success: true, type: userType, user, ssn });
    } else {
      console.log("Login Failed, Wrong password");
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
