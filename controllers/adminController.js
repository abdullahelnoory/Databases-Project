const pool = require('../models/db')

exports.verify = async (req, res) => {
  const ssn = req.body.ssn;
  const m_ssn = req.body.m_ssn;
  const query = 'update "Manager" set verified_by = $1 where ssn = $2';
  try {
    await pool.query(query, [ssn, m_ssn]);
    res.json({ success: true });
  }
  catch (err) {
    res.json({ success: false });
  }
};

exports.addStation = async (req, res) => {
  const { station_name, street, zipcode, governorate, m_ssn } = req.body;
  const query = 'insert into "Station" ("station_name", "street", "zipcode", "governorate") values($1,$2,$3,$4)';
  console.log(req.body);
  try {
    await pool.query(query, [station_name, street, zipcode, governorate]);
    res.json({ success: true });
  }
  catch (err) {
    if (err.code === "23505") {
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
    console.log(err);
  }
};

exports.removeStation = async (req, res) => {
  const station_ids = req.body.stationIds; 

  const query = `DELETE FROM "Station" WHERE station_id = $1`;

  try {
    for (const id of station_ids) {
      await pool.query(query, [id]);
    }

    res.json({ success: true, message: "Stations deleted successfully." });
  } catch (err) {
    console.error("Error deleting stations:", err);
    res.status(500).json({ success: false, message: "An error occurred while deleting stations." });
  }
};

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


