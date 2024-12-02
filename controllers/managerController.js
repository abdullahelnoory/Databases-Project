const pool = require("../models/db");

exports.getStations = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "Station"');
    res.json({
      data: result.rows,
      success: true,
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
};

exports.createTrip = async (req, res) => {
  const { mssn, price, date, dssn, estimatedtime, destinationStation } = req.body;

  try {
    const resultCount = await pool.query('SELECT COUNT(*) FROM "Trip"');
    const tripid = parseInt(resultCount.rows[0].count) + 1;

    const managerResult = await pool.query(
      'SELECT "StationID" FROM "Station" WHERE "MSSN" = $1',
      [mssn]
    );
    const sourceStation = managerResult.rows[0].StationID;

    const result = await pool.query(
      'INSERT INTO "Trip" ("tripid", "price", "date", "estimatedtime", "d_ssn", "sourceStation", "destinationStation") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', // Added RETURNING * to get the inserted row
      [
        tripid,
        price,
        date,
        estimatedtime,
        dssn,
        sourceStation,
        destinationStation,
      ]
    );

    res.json({
      data: result.rows[0],
      success: true,
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
};

exports.getDrivers = async (req, res) => {
  const { mssn } = req.body;
  try {
    const result = await pool.query('SELECT * FROM "Driver" WHERE "MSSN" = $1', [
      mssn,
    ]);
    res.json({
      data: result.rows,
      success: true,
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
};

exports.getPrivateTrips = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "PrivateTrip"'); // Add Vacations
    res.json({
      data: result.rows,
      success: true,
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
};

//works
exports.fireDriver = async (req, res) => {
  const { mssn, dssn } = req.body;
  try {
    const result = await pool.query(
      'UPDATE "Driver" SET "MSSN" = NULL, "Shift" = NULL, "Salary" = NULL, "S_ID" = NULL WHERE "MSSN" = $1 AND "ssn" = $2',
      [mssn, dssn]
    );
    res.json({
      data: result.rows,
      success: true,
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
};

//works
exports.hireDriver = async (req, res) => {
  const { mssn, dssn, shift, salary } = req.body;

  try {
    const managerResult = await pool.query(
      'SELECT "StationID" FROM "Station" WHERE "MSSN" = $1',
      [mssn]
    );

    if (managerResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Station not found",
      });
    }

    const s_id = managerResult.rows[0].StationID;

    const result = await pool.query(
      'UPDATE "Driver" SET "MSSN" = $1, "Shift" = $2, "Salary" = $3, "S_ID" = $4 WHERE "ssn" = $5',
      [mssn, shift, salary, s_id, dssn]
    );

    res.json({
      data: result.rows,
      success: true,
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
};

//works
exports.updateDriverSalary = async (req, res) => {
  const { mssn, dssn, newSalary } = req.body;

  try {
    const result = await pool.query(
      'UPDATE "Driver" SET "Salary" = $1 WHERE "MSSN" = $2 OR "ssn" = $3',
      [newSalary, mssn, dssn]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    res.json({
      success: true,
      message: "Driver's salary updated successfully",
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
};
