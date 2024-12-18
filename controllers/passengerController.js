const pool = require("../models/db");

exports.rateTrip = async (req, res) => {
  const { p_id, t_id, rate, comment } = req.body;
  const query1 = 'select * from "Passenger Trip" where p_id = $1 and t_id = $2';
  const query_c = 'select count(*) from "Passenger Trip" where t_id = $1';
  try {
    const result_c = await pool.query(query_c, [t_id]);
    if (result_c.rows[0].count >= 25) {
      res.json({
        success: true,
        message:
          "Sorry, this trip was rated by 25 passengers and this is the maximum number of rates.",
      });
    } else {
      const result1 = await pool.query(query1, [p_id, t_id]);
      if (result1.rows.length == 0) {
        const query2 = 'insert into "Review" values($1, $2, $3, $4)';
        await pool.query(query2, [p_id, t_id, rate, comment]);
        res.json({ success: true, message: "A new rate is inserted!" });
      } else {
        const query3 =
          'update "Review" set rate = $1, comment = $2 where p_id = $3 and t_id = $4';
        await pool.query(query3, [rate, comment, p_id, t_id]);
        res.json({
          success: true,
          message:
            "This passenger has rated the same trip before so the rate is updated!",
        });
      }
    }
  } catch (error) {
    if (error.code == "23503") {
      res.json({
        success: false,
        message: "The inserted passenger or trip doesn't exist in the system!",
        details: error.detail,
      });
    } else {
      console.error("Error connecting to the database:", error);
      res.status(500).json({
        success: false,
        message: "Database connection failed",
      });
    }
  }
};

exports.orderPrivateTrip = async (req, res) => {
  const { Source, Destination, date, p_id, Price } = req.body;
  const query =
    'insert into "Private Trip" (source, destination, price, date, p_id) values($1, $2, $3, $4, $5)';
  try {
    await pool.query(query, [Source, Destination, Price, date, p_id]);
    res.json({
      success: true,
      message: "Your request is recorded successfully!",
    });
  } catch (error) {
    if (error.code == "23503") {
      res.json({
        success: false,
        message: "The inserted passenger doesn't exist in the system!",
        details: error.detail,
      });
    } else {
      console.error("Error connecting to the database:", error);
      res.status(500).json({
        success: false,
        message: "Database connection failed",
      });
    }
  }
};

exports.requestTrip = async (req, res) => {
  const { p_id, t_id, rate } = req.body;
  console.log(req.body);
  const query1 =
    'select c.number_of_seats from "Car" c,"Driver" d,"Trip" t where c.d_ssn = d.ssn and d.ssn = t.d_ssn and t.trip_id = $1';
  const query2 = 'select count(*) from "Passenger Trip" where t_id = $1';
  const query3 = 'insert into "Passenger Trip" values($1,$2,false,$3)';
  try {
    const result1 = await pool.query(query1, [t_id]);
    if (result1.rows.length == 0)
      res.json({ success: true, message: "This trip is not found!" });
    const number_of_seats = 25;
    const result2 = await pool.query(query2, [t_id]);
    if (result2.rows[0].count < number_of_seats) {
      await pool.query(query3, [p_id, t_id, rate]);
      res.json({
        success: true,
        message: "The trip is requested successfully!",
      });
    } else res.json({ success: true, message: "Sorry, the trip is full now!" });
  } catch (error) {
    if (error.code == "23503") {
      res.json({
        success: false,
        message: "The inserted passenger or trip doesn't exist in the system!",
        details: error.detail,
      });
    } else {
      console.error("Error connecting to the database:", error);
      res.status(500).json({
        success: false,
        message: "Database connection failed",
      });
    }
  }
};

exports.getMyTrips = async (req, res) => {
  const p_id = req.body.p_id;
  console.log(req.body);
  const query =
    'select t_id, s.station_id as source_id, d.station_id as destination_id, s.station_name as source,d.station_name as destination, t.price, pt.is_favourite, pt.rate, d1.ssn as driver_ssn, d1.fname driver_fname, d1.mname, d1.lname from "Trip" t,"Passenger Trip" pt, "Driver" d1, "Station" s, "Station" d where t.trip_id = pt.t_id and s.station_id = t.source_station and d.station_id = t.destination_station and d1.ssn = t.d_ssn and pt.p_id = $1';
  try {
    const result = await pool.query(query, [p_id]);
    console.log(result.rows);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
};

exports.getTrips = async (req, res) => {
  const accepted = "ongoing";
  const p_id = req.body.p_id;
  const query =
    'select d1.ssn driver_ssn, d1.fname driver_fname, d1.mname, d1.lname, s.station_id as source_id, s.station_name source, s.street source_street, s.governorate source_governorate, d.station_id as destination_id, d.station_name destination, d.street as destination_street, d.governorate as destination_governorate, t.trip_id , t.price , t.estimated_time from "Driver" d1, "Station" s, "Station" d, "Trip" t where d1.ssn = t.d_ssn and t.source_station = s.station_id and t.destination_station = d.station_id and t.status = $1 and t.trip_id not in (select t_id from "Passenger Trip" where p_id = $2)';
  try {
    const result = await pool.query(query, [accepted, p_id]);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error connecting to the database:", error);
    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
};

exports.getStatusPrivateTrips = async (req, res) => {
  const p_id = req.body.p_id;
  const query =
    'select source, destination, d_ssn from "Private Trip" where p_id = $1';
  try {
    const result = await pool.query(query, [p_id]);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    if (error.code == "23503") {
      res.json({
        success: false,
        message: "The inserted passenger doesn't exist in the system!",
        details: error.detail,
      });
    } else {
      console.error("Error connecting to the database:", error);
      res.status(500).json({
        success: false,
        message: "Database connection failed",
      });
    }
  }
};

exports.setFavouriteTrip = async (req, res) => {
  const { p_id, t_id, isFavourite } = req.body;
  const query =
    'update "Passenger Trip" set is_favourite = $1 where p_id = $2 and t_id = $3';
  try {
    await pool.query(query, [isFavourite, p_id, t_id]);
    res.json({ success: true, Message: "The operation is done successfully!" });
  } catch (error) {
    if (error.code == "23503") {
      res.json({
        success: false,
        message: "The passenger or the trip doesn't exist in the system!",
        details: error.detail,
      });
    } else {
      console.error("Error connecting to the database:", error);
      res.status(500).json({
        success: false,
        message: "Database connection failed",
      });
    }
  }
};

exports.station = async (req, res) => {
    const st_id = req.body.st_id;
    const query = 'select station_name, street, zipcode, governorate, rate from "Station" where station_id = $1';
    try
    {
        const result = await pool.query(query, [st_id]);
        res.json({success : true, data : {station_name : result.rows[0].station_name, street : result.rows[0].street, zipcode : result.rows[0].zipcode, governorate : result.rows[0].governorate, rate : result.rows[0].rate}});
    }
    catch(error)
    {
        console.error("Error connecting to the database:", error);
        res.status(500).json({
          success: false,
          message: "Database connection failed",
        }); 
    } 
};
