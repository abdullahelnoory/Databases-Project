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
  const { station_id, station_name, street, zipcode, governorate, m_ssn } = req.body;
  const query = 'insert into "Station" values($1,$2,$3,$4,$5,$6)';
  try {
    await pool.query(query, [station_id, station_name, street, zipcode, governorate, m_ssn]);
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
  const s_name = req.body.s_name;
  const query = 'delete from "Station" where station_name = $1';
  try {
    const result = pool.query(query, [s_name]);
    if (result.rowCount > 0)
      res.json({ success: true, message: "Successfully removed a station" });
    else
      res.json({ success: true, message: "There isn't any station with this name!" });

  }
  catch (err) {
    res.json({ success: false });
    console.log(err);
  }
}

