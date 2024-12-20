const { response } = require("express");
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

exports.getPrivateTrips = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM "Private Trip" WHERE "d_ssn" is NULL'
    );
    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching private trips:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.acceptTrips = async (req, res) => {
  const { trip_id, d_ssn, Status, estimated_time } = req.body;
  console.log(req.body);

  try {
    const result = await pool.query(
      'Update  "Trip" set  "status"= $3 , "estimated_time"=$4  where "d_ssn"=$2 and "trip_id"=$1  RETURNING *',
      [trip_id, d_ssn, Status, estimated_time]
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

exports.getAcceptedTrips = async (req, res) => {
  const { d_ssn } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM "Trip" WHERE "d_ssn" = $1 and "status"=$2',
      [d_ssn, "accepted"]
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching trips:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.startAcceptedTrips = async (req, res) => {
  const { d_ssn, Status, trip_id } = req.body;
  try {
    const result = await pool.query(
      'UPDATE "Trip" SET "status" = $1 WHERE "trip_id" = $2',
      [Status, trip_id]
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching trips:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.getTrips = async (req, res) => {
  const { d_ssn } = req.body;
  try {
    const result1 = await pool.query(
      'SELECT * FROM "Trip" WHERE "d_ssn" = $1 and "status"=$2',
      [d_ssn, "idle"]
    );

    const result2 = await pool.query(
      'SELECT * FROM "Trip" WHERE "d_ssn" = $1 and "status"=$2 or "status"=$3',
      [d_ssn, "accepted", "ongoing"]
    );

    res.json({
      success: true,
      tripsidle: result1.rows,
      tripsaccepted: result2.rows,
    });
  } catch (error) {
    console.error("Error fetching trips:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.rejectTrip = async (req, res) => {
  const { trip_id } = req.body;

  try {
    const result = await pool.query(
      'UPDATE "Trip" SET "status" = $1 WHERE "trip_id" = $2 RETURNING *',
      ["rejected", trip_id]
    );

    res.json({
      success: true,
      message: "Trip rejected successfully.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error rejecting trip:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.ongoingAcceptedTrips = async (req, res) => {
  const { d_ssn, trip_id } = req.body;
  try {
    const result = await pool.query(
      'UPDATE "Trip" SET "status" = $1 WHERE "trip_id" = $2',
      ["ongoing", trip_id]
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching trips:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
exports.getNumberofPassengers = async (req, res) => {
  const { trip_id } = req.body;
  console.log(req.body);
  try {
    const result = await pool.query(
      'SELECT count(*) FROM "Passenger Trip" WHERE "t_id" = $1',
      [trip_id]
    );
    console.log(result.rows[0]);
    res.json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error fetching number of passengers:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.markAttendance = async (req, res) => {
  const { d_ssn } = req.body;

  try {
    function formatTimeToAMPM(date) {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      return `${hours}:${minutes} ${ampm}`;
    }

    const currentDate = new Date().toISOString().split("T")[0];

    const checkAttendance = await pool.query(
      'SELECT * FROM "Attendance" WHERE "d_ssn" = $1 AND "date" = $2',
      [d_ssn, currentDate]
    );

    if (checkAttendance.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Attendance has already been marked for today.",
      });
    }

    const result = await pool.query(
      'INSERT INTO "Attendance" ("d_ssn", "date", "arrival_time", "leave_time") VALUES ($1, $2, $3, $4) RETURNING *',
      [d_ssn, currentDate, formatTimeToAMPM(new Date()), "5:00:00 PM"]
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

exports.getAttendance = async (req, res) => {
  const { d_ssn } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM "Attendance" WHERE "d_ssn" = $1',
      [d_ssn]
    );
    if (result.rows.length > 0) {
      res.json({
        attend: false,
      });
    } else {
      res.json({
        attend: true,
      });
    }
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    res.status(500).json({
      success: true,
      message: "Server error. Please try again later.",
    });
  }
};

exports.acceptRejectPrivateTrip = async (req, res) => {
  const { order_id, d_ssn, Accept } = req.body;
  console.log(req.body);

  try {
    if (Accept) {
      const result = await pool.query(
        'UPDATE "Private Trip" SET "d_ssn" = $1 WHERE "order_id" = $2 RETURNING *',
        [d_ssn, order_id]
      );
      res.json({
        success: true,
        message: "Private trip accepted successfully.",
        data: result.rows[0],
      });
    } else {
      const result = await pool.query(
        'UPDATE "Private Trip" SET "d_ssn" = NULL WHERE "order_id" = $1 RETURNING *',
        [order_id]
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

exports.getPrivateStatus = async (req, res) => {
  const { d_ssn } = req.body;
  try {
    const result = await pool.query(
      'SELECT "is_private" FROM "Driver" WHERE "ssn" = $1',
      [d_ssn]
    );

    if (result.rows.length > 0) {
      const isPrivate = result.rows[0].is_private;

      res.json({
        isPrivate: isPrivate,
      });
    } else {
      res.json({
        isPrivate: false,
      });
    }
  } catch (error) {
    console.error("Error fetching private trip status:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.requestDayOff = async (req, res) => {
  console.log(req.body);
  const { d_ssn, date } = req.body;

  try {
    const mSsnResult = await pool.query(
      'SELECT "m_ssn" FROM "Driver" WHERE "ssn" = $1',
      [d_ssn]
    );

    if (mSsnResult.rows.length === 0 || !mSsnResult.rows[0].m_ssn) {
      return res.status(400).json({
        success: false,
        message: "No associated manager (m_ssn) found for this driver.",
      });
    }

    const m_ssn = mSsnResult.rows[0].m_ssn;

    console.log(m_ssn);

    const existingRequest = await pool.query(
      'SELECT * FROM "Vacation" WHERE "d_ssn" = $1 AND "date" = $2',
      [d_ssn, date]
    );

    if (existingRequest.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "A day-off request for this date has already been submitted.",
      });
    }

    const result = await pool.query(
      'INSERT INTO "Vacation" ("m_ssn", "d_ssn", "date", "status") VALUES ($1, $2, $3, $4) RETURNING *',
      [m_ssn, d_ssn, date, "pending"]
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


exports.getDayOffRequests = async (req, res) => {
  const { d_ssn } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM "Vacation" WHERE "d_ssn" = $1',
      [d_ssn]
    );
    console.log(result.rows);
    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching day off requests:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.reportLostItem = async (req, res) => {
  const { trip_id, item, quantity, item_description } = req.body;
  console.log(req.body);

  try {
    const result = await pool.query(
      'INSERT INTO "Lost & Found" ("t_id", "item", "quantity") VALUES ($1, $2, $3) RETURNING *',
      [trip_id, item, quantity]
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
  const { d_ssn, reason } = req.body;
  console.log(req.body);

  try {
    const result = await pool.query(
      'UPDATE "Driver" SET "m_ssn" = null, "shift" = null, "salary" = null, "s_id" = null WHERE "ssn" = $1 RETURNING *',
      [d_ssn]
    );
    console.log(result.rows[0]);
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

exports.profile = async (req, res) => {
  const { ssn } = req.body;
  try {
    const result = await pool.query(
      'SELECT "ssn", "email", "fname", "mname", "lname", "is_private", "m_ssn", "shift", "salary", "s_id"  FROM "Driver" WHERE "ssn" = $1',
      [ssn]
    );

    console.log(result.rows);

    if (result.rows.length > 0) {
      const driver = result.rows[0];
      const responseData = {
        success: true,
        data: driver,
      };

      if (driver.m_ssn) {
        const managerResult = await pool.query(
          'SELECT "fname", "mname", "lname" FROM "Manager" WHERE "ssn" = $1',
          [driver.m_ssn]
        );
        if (managerResult.rows.length > 0) {
          responseData.manager = `${managerResult.rows[0].fname} ${managerResult.rows[0].lname}`;
        }
      }

      if (driver.s_id) {
        const stationResult = await pool.query(
          'SELECT "station_name" FROM "Station" WHERE "station_id" = $1',
          [driver.s_id]
        );
        if (stationResult.rows.length > 0) {
          responseData.station = stationResult.rows[0].station_name;
        }
      }

      console.log(responseData);
      res.json(responseData);
    } else {
      res.status(404).json({
        success: false,
        message: "Driver not found.",
      });
    }
  } catch (error) {
    console.error("Error fetching driver profile:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.updateProfile = async (req, res) => {
  const { ssn, fname, mname, lname, email, is_private } = req.body;

  try {
    const result = await pool.query('SELECT * FROM "Driver" WHERE "ssn" = $1', [ssn]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Driver not found.",
      });
    }

    const emailCheckResult = await pool.query(`
      SELECT email FROM "Passenger" WHERE email = $1 AND id <> $2
      UNION
      SELECT email FROM "Admin" WHERE email = $1 AND ssn <> $2
      UNION
      SELECT email FROM "Manager" WHERE email = $1 AND ssn <> $2
      UNION
      SELECT email FROM "Driver" WHERE email = $1 AND ssn <> $2
    `, [email , ssn]);

    if (emailCheckResult.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "The provided email is already associated with another user.",
      });
    }

    let manager = null;
    if (result.rows[0].m_ssn) {
      const managerResult = await pool.query(
        'SELECT "fname", "lname" FROM "Manager" WHERE "ssn" = $1',
        [result.rows[0].m_ssn]
      );
      if (managerResult.rows.length > 0) {
        manager = `${managerResult.rows[0].fname} ${managerResult.rows[0].lname}`;
      }
    }

    let station = null;
    if (result.rows[0].s_id) {
      const stationResult = await pool.query(
        'SELECT "station_name" FROM "Station" WHERE "station_id" = $1',
        [result.rows[0].s_id]
      );
      if (stationResult.rows.length > 0) {
        station = stationResult.rows[0].station_name; 
      }
    }

    await pool.query(
      'UPDATE "Driver" SET "fname" = $1, "mname" = $2, "lname" = $3, "email" = $4, "is_private" = $5 WHERE "ssn" = $6',
      [fname, mname, lname, email, is_private, ssn]
    );

    res.json({
      success: true,
      message: "Profile updated successfully!",
      data: {
        fname,
        mname,
        lname,
        email,
        is_private,
      },
      manager,
      station,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.getRate = async (req, res) => {
  const { ssn } = req.body;

  try {
    const tripResult = await pool.query(
      'SELECT AVG(rate) AS average_rate FROM "Trip", "Passenger Trip" WHERE "trip_id" = "t_id" AND "d_ssn" = $1',
      [ssn]
    );

    if (tripResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No trips found for the provided SSN.",
      });
    }

    const averageRate = tripResult.rows[0].average_rate;

    res.json({
      success: true,
      data: {
        average_rate: averageRate,
      },
    });
  } catch (error) {
    console.error("Error fetching driver's trip ratings:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
