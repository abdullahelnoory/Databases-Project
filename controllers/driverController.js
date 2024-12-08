const pool = require("../models/db");

exports.setEstimatedTime = async (req, res) => {
  const { trip_id, estimated_time } = req.body;

  try {
    const result = await pool.query(
      'UPDATE "Trip" SET "estimated_time" = $1 WHERE "trip_id" = $2 RETURNING *',
      [estimated_time, trip_id]
    );

    if (result.rows.length > 0) {
      res.json({
        success: true,
        message: "Estimated time updated successfully.",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Trip not found.",
      });
    }
  } catch (error) {
    console.error("Error updating estimated time:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.requestTripChange = async (req, res) => {
  const { trip_id, reason, d_ssn } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO "Trip Change Request" ("trip_id", "driver_ssn", "reason") VALUES ($1, $2, $3) RETURNING *',
      [trip_id, d_ssn, reason]
    );

    res.json({
      success: true,
      message: "Trip change request submitted successfully.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error requesting trip change:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.markAttendance = async (req, res) => {
  const { d_ssn} = req.body;
  
  try {
    const result = await pool.query(
      'INSERT INTO "Attendance" ("driver_ssn", "shift_date", "status") VALUES ($1, $2, $3) RETURNING *',
      [d_ssn, shift_date, status]
    );

    res.json({
      success: true,
      message: "Attendance marked successfully.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error marking attendance:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.acceptRejectPrivateTrip = async (req, res) => {
  const { trip_id, d_ssn, accept } = req.body;

  try {
    if (accept) {
      const result = await pool.query(
        'UPDATE "Private Trip" SET "driver_ssn" = $1 WHERE "trip_id" = $2 RETURNING *',
        [d_ssn, trip_id]
      );
      res.json({
        success: true,
        message: "Private trip accepted successfully.",
        data: result.rows[0],
      });
    } else {
      const result = await pool.query(
        'UPDATE "Private Trip" SET "driver_ssn" = NULL WHERE "trip_id" = $2 RETURNING *',
        [trip_id]
      );
      res.json({
        success: true,
        message: "Private trip request rejected.",
        data: result.rows[0],
      });
    }
  } catch (error) {
    console.error("Error accepting/rejecting private trip:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.requestDayOff = async (req, res) => {
  const { d_ssn, date, reason } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO "Day Off Request" ("driver_ssn", "date", "reason") VALUES ($1, $2, $3) RETURNING *',
      [d_ssn, date, reason]
    );

    res.json({
      success: true,
      message: "Day off request submitted successfully.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error requesting day off:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.reportLostItem = async (req, res) => {
  const { d_ssn, trip_id, item_description } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO "Lost and Found" ("driver_ssn", "trip_id", "item_description") VALUES ($1, $2, $3) RETURNING *',
      [d_ssn, trip_id, item_description]
    );

    res.json({
      success: true,
      message: "Lost item reported successfully.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error reporting lost item:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.resignDriver = async (req, res) => {
  const { d_ssn, resignation_reason, effective_date } = req.body;

  try {
    const result = await pool.query(
      'UPDATE "Driver" SET "status" = $1, "resignation_reason" = $2, "resignation_date" = $3 WHERE "ssn" = $4 RETURNING *',
      ['resigned', resignation_reason, effective_date, d_ssn]
    );

    res.json({
      success: true,
      message: "Driver resignation processed successfully.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error processing resignation:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
