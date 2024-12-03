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

exports.getTrips = async (req, res) => {
  const { m_ssn } = req.body;
  try {
    const managerResult = await pool.query(
      'SELECT "station_id" FROM "Station" WHERE "m_ssn" = $1',
      [m_ssn]
    );

    
    if (managerResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Station not found",
      });
    }
    
    const s_id = managerResult.rows[0].station_id;
    const result = await pool.query(
      'SELECT * FROM "Trip" WHERE "source_station" = $1',
      [s_id]
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

exports.createTrip = async (req, res) => {
  const { m_ssn, price, date, d_ssn, estimated_time, destination_station } =
    req.body;

  try {
    const resultCount = await pool.query('SELECT COUNT(*) FROM "Trip"');
    const trip_id = parseInt(resultCount.rows[0].count) + 1;

    const managerResult = await pool.query(
      'SELECT "station_id" FROM "Station" WHERE "m_ssn" = $1',
      [m_ssn]
    );
    const source_station = managerResult.rows[0].station_id;

    const result = await pool.query(
      'INSERT INTO "Trip" ("trip_id", "price", "date", "estimated_time", "d_ssn", "source_station", "destination_station") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *', // Added RETURNING * to get the inserted row
      [
        trip_id,
        price,
        date,
        estimated_time,
        d_ssn,
        source_station,
        destination_station,
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
  const { m_ssn } = req.body;
  console.log(req.body);
  try {
    const result = await pool.query(
      'SELECT * FROM "Driver" WHERE "m_ssn" = $1',
      [m_ssn]
    );
    console.log({
      data: result.rows,
      success: true,
    });
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
    const result = await pool.query('SELECT * FROM "Private Trip"'); // Add Vacations
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
  const { m_ssn, d_ssn } = req.body;
  try {
    const result = await pool.query(
      'UPDATE "Driver" SET "m_ssn" = NULL, "shift" = NULL, "salary" = NULL, "s_id" = NULL WHERE "m_ssn" = $1 AND "ssn" = $2',
      [m_ssn, d_ssn]
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
  const { m_ssn, d_ssn, shift, salary } = req.body;

  try {
    const managerResult = await pool.query(
      'SELECT "StationID" FROM "Station" WHERE "m_ssn" = $1',
      [m_ssn]
    );

    if (managerResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Station not found",
      });
    }

    const s_id = managerResult.rows[0].station_id;

    const result = await pool.query(
      'UPDATE "Driver" SET "m_ssn" = $1, "shift" = $2, "salary" = $3, "s_id" = $4 WHERE "ssn" = $5',
      [m_ssn, shift, salary, s_id, d_ssn]
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
  const { m_ssn, d_ssn, new_salary } = req.body;

  try {
    const result = await pool.query(
      'UPDATE "Driver" SET "Salary" = $1 WHERE "m_ssn" = $2 OR "ssn" = $3',
      [new_salary, m_ssn, d_ssn]
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
