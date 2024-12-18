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
      'SELECT * FROM "Private Trip" WHERE "d_ssn" is NULL',
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
}

exports.acceptTrips = async (req, res) => {
  const {trip_id, d_ssn, Status, estimated_time} = req.body;
  console.log(req.body);

  try {
    const result = await pool.query(
      'Update  "Trip" set  "status"= $3 , "estimated_time"=$4  where "d_ssn"=$2 and "trip_id"=$1  RETURNING *',
      [trip_id, d_ssn, Status, estimated_time,]
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
}

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
}

exports.getTrips = async (req, res) => {
  const { d_ssn } = req.body;
  try {
    const result1 = await pool.query(
      'SELECT * FROM "Trip" WHERE "d_ssn" = $1 and "status"=$2',
      [d_ssn, "idle"]
    );

    const result2 = await pool.query(
      'SELECT * FROM "Trip" WHERE "d_ssn" = $1 and "status"=$2 or "status"=$3',
      [d_ssn, "accepted","ongoing",]
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
}

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
}

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
}
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
}


exports.markAttendance = async (req, res) => {
  const { d_ssn } = req.body;

  try {
    function formatTimeToAMPM(date) {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      return `${hours}:${minutes} ${ampm}`;
    }

    const currentDate = new Date().toISOString().split('T')[0];

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
      [
        d_ssn,
        currentDate,
        formatTimeToAMPM(new Date()),
        '5:00:00 PM'
      ]
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
        attend: false
      });
    } else {
      res.json({
        attend: true
      });
    }
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    res.status(500).json({
      success: true,
      message: "Server error. Please try again later.",
    });
  }
}

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
      [1, d_ssn, date, false]
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
