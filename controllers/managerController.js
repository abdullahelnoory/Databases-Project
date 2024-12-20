const pool = require("../models/db");

exports.getStations = async (req, res) => {
  const { m_ssn } = req.body;
  try {
    const result = await pool.query(
      'SELECT "station_id", "station_name" FROM "Station" WHERE m_ssn <> $1',
      [m_ssn]
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

exports.getTrips = async (req, res) => {
  const { m_ssn } = req.body;

  try {
    const result1 = await pool.query(
      `SELECT t.trip_id, t.d_ssn, ts1.station_name AS source_station, ts2.station_name AS destination_station,
              t.price, t.estimated_time, 
              CONCAT(d.fname, ' ', d.lname) AS driver_full_name
       FROM "Trip" t
       JOIN "Station" ts1 ON t.source_station = ts1.station_id
       JOIN "Station" ts2 ON t.destination_station = ts2.station_id
       JOIN "Manager" m ON ts1.m_ssn = m.ssn
       LEFT JOIN "Driver" d ON t.d_ssn = d.ssn
       WHERE m.ssn = $1`,
      [m_ssn]
    );

    if (result1.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Station not found",
      });
    }

    res.json({
      data: result1.rows,
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
      'INSERT INTO "Trip" ("trip_id", "price", "date", "d_ssn", "source_station", "destination_station") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', // Added RETURNING * to get the inserted row
      [trip_id, price, date, d_ssn, source_station, destination_station]
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
  try {
    const result = await pool.query(
      'SELECT * FROM "Driver" WHERE "m_ssn" = $1',
      [m_ssn]
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

exports.getPrivateTrips = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "Private Trip"');
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
    const driverResult = await pool.query(
      'SELECT * FROM "Driver" WHERE "ssn" = $1',
      [d_ssn]
    );

    if (driverResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Driver with this SSN does not exist",
      });
    }

    const existingManagerResult = await pool.query(
      'SELECT "m_ssn" FROM "Driver" WHERE "ssn" = $1',
      [d_ssn]
    );

    if (
      existingManagerResult.rows.length > 0 &&
      existingManagerResult.rows[0].m_ssn !== null
    ) {
      return res.status(400).json({
        success: false,
        message: "Driver is already working for another manager",
      });
    }

    const managerResult = await pool.query(
      'SELECT "station_id" FROM "Station" WHERE "m_ssn" = $1',
      [m_ssn]
    );

    if (managerResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Station not found for the provided manager",
      });
    }

    const s_id = managerResult.rows[0].station_id;

    const result = await pool.query(
      'UPDATE "Driver" SET "m_ssn" = $1, "shift" = $2, "salary" = $3, "s_id" = $4 WHERE "ssn" = $5',
      [m_ssn, shift, salary, s_id, d_ssn]
    );

    res.json({
      success: true,
      message: "Driver hired successfully!",
      data: result.rows,
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
};

exports.updateDriverSalary = async (req, res) => {
  const { m_ssn, d_ssn, new_salary } = req.body;
  try {
    const result = await pool.query(
      'UPDATE "Driver" SET "salary" = $1 WHERE "m_ssn" = $2 AND "ssn" = $3',
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

exports.getAvailableDrivers = async (req, res) => {
  const { m_ssn } = req.body;
  try {
    const result = await pool.query(
      'SELECT "ssn", "fname", "lname", "salary" FROM "Driver" WHERE "is_available" = true AND m_ssn = $1',
      [m_ssn]
    );

    if (result.rows.length > 0) {
      return res.status(200).json({
        success: true,
        data: result.rows,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No available drivers found.",
      });
    }
  } catch (error) {
    console.error("Error getting available drivers:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.updateTripPrice = async (req, res) => {
  const [firstTrip] = req.body.trips;
  const { new_price, trip_id } = firstTrip;

  try {
    const result = await pool.query(
      `UPDATE "Trip" SET price = $1 WHERE trip_id = $2 RETURNING *`,
      [new_price, trip_id]
    );

    if (result.rows.length > 0) {
      return res.status(200).json({
        success: true,
        message: "Trip price updated successfully.",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Trip not found.",
      });
    }
  } catch (error) {
    console.error("Error updating trip price:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.updateTripDestination = async (req, res) => {
  const { trips } = req.body;

  try {
    for (let trip of trips) {
      const { m_ssn, new_destination, trip_id } = trip;

      const result = await pool.query(
        `UPDATE "Trip" SET destination_station = $1 WHERE trip_id = $2 RETURNING *`,
        [new_destination, trip_id]
      );

      if (result.rows.length === 0) {
        console.log(`Trip with ID ${trip_id} not found.`);
      }
    }

    return res.status(200).json({
      success: true,
      message: "All trips' destinations updated successfully.",
    });
  } catch (error) {
    console.error("Error updating trip destinations:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.updateTripDriver = async (req, res) => {
  const { trips } = req.body;

  try {
    for (let trip of trips) {
      const { d_ssn, trip_id } = trip;
      const result = await pool.query(
        `UPDATE "Trip" SET d_ssn = $1 WHERE trip_id = $2 RETURNING *`,
        [d_ssn, trip_id]
      );

      if (result.rows.length === 0) {
        console.log(`Trip with ID ${trip_id} not found.`);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Driver assigned to all trips successfully.",
    });
  } catch (error) {
    console.error("Error assigning driver to trips:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.getManagerFinanace = async (req, res) => {
  const { m_ssn } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM "Manager Finance" WHERE "m_ssn" = $1',
      [m_ssn]
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



exports.addManagerFinancesSalary = async (req, res) => {
  const { m_ssn, salary } = req.body;

  try {
    // Get the current date and month
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10); // Format as YYYY-MM-DD
    const currentMonth = currentDate.getMonth() + 1; // Current month (1-12)

    // Fetch all drivers' SSNs associated with the manager
    const driversResult = await pool.query(
      'SELECT "ssn" FROM "Driver" WHERE m_ssn = $1',
      [m_ssn]
    );

    if (driversResult.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No drivers found for the given manager SSN.",
      });
    }

    // Extract all driver SSNs
    const driverSsns = driversResult.rows.map(row => row.ssn);

    // Calculate total profit for the current month for all drivers
    const totalProfitResult = await pool.query(
      `SELECT SUM("price") AS total_profit 
       FROM "Trip" 
       WHERE d_ssn = ANY($1) AND EXTRACT(MONTH FROM TO_DATE("date", 'YYYY-MM-DD')) = $2`,
      [driverSsns, currentMonth]
    );

    const totalProfit = totalProfitResult.rows[0].total_profit || 0;

    console.log("Total Profit:", totalProfit);

    // Insert data into Manager Finance table
    const result = await pool.query(
      `INSERT INTO "Manager Finance" ("m_ssn", "date", "salary", "total_profit") 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [m_ssn, formattedDate, totalProfit - salary, totalProfit]
    );

    res.json({
      data: result.rows[0],
      success: true,
    });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
};



exports.checkManagerVerified = async (req, res) => {
  const { m_ssn } = req.body;

  try {
    const result = await pool.query(
      'SELECT "verified_by", CONCAT("fname", \' \', "mname", \' \', "lname") AS fullName FROM "Manager" WHERE "ssn" = $1',
      [m_ssn]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Manager not found",
      });
    }

    const { verified_by, fullName } = result.rows[0];

    const isVerified = verified_by !== null;

    res.json({
      success: true,
      data: {
        isVerified,
        fullName,
      },
    });
  } catch (error) {
    console.error("Error checking manager verification:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
};

exports.requests = async (req, res) => {
  const { m_ssn } = req.body;

  console.log("Manager SSN:", req.body);

  try {
    const result = await pool.query(
      `
        SELECT v.*, 
               CONCAT(d."fname", ' ', d."mname", ' ', d."lname") AS driver_name
        FROM "Vacation" v
        LEFT JOIN "Driver" d ON v."d_ssn" = d."ssn"
        WHERE v."m_ssn" = $1 AND v."status" = 'pending'
      `,
      [m_ssn]
    );

    console.log(result.rows);

    res.json({
      data: result.rows,
      success: true,
    });
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
};

exports.respondRequest = async (req, res) => {
  const { m_ssn, d_ssn, date, response } = req.body;

  try {
    const result = await pool.query(
      `
        UPDATE "Vacation"
        SET "status" = $1
        WHERE "m_ssn" = $2 AND "d_ssn" = $3 AND "date" = $4
      `,
      [response, m_ssn, d_ssn, date]
    );

    res.json({
      success: true,
      message: "Request response updated successfully",
    });
  } catch (error) {
    console.error("Error updating request response:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
}