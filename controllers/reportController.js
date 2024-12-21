const pool = require("../models/db");

exports.getMostSourceStationReport = async (req, res) => {
  try {
    const query = `
          SELECT station_name, COUNT(trip_id) AS visit_count
          FROM  "Trip", "Station" 
          WHERE "source_station" = "station_id"
          GROUP BY  station_name
          ORDER BY  visit_count DESC LIMIT 10;
        `;

    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No station visit data available.",
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching station report:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.getMostDestinationStationReport = async (req, res) => {
  try {
    const query = `
            SELECT "station_name", COUNT(station_id) AS visit_count
            FROM  "Trip", "Station" 
            WHERE "destination_station" = "station_id"
            GROUP BY  "station_name"
            ORDER BY  visit_count DESC LIMIT 10;
          `;

    const result = await pool.query(query);

    console.log(result.rows);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No station visit data available.",
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching station report:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
exports.getTripReport = async (req, res) => {
  try {
    const query = `
            SELECT "source_station", "destination_station", COUNT(*) AS trip_count
            FROM  "Trips"
            GROUP BY  "source_station", "destination_station"
            ORDER BY  trip_count DESC LIMIT 10;
        `;
    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No route trip data available.",
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching route report:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.stationsCount = async (req, res) => {
  const query = 'select count(*) from "Station"';
  try {
    const result = await pool.query(query);
    res.json({ success: true, count: result.rows[0].count });
  } catch (error) {
    console.error("Error fetching station report:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.mostLostItemsInTrips = async (req, res) => {
  const query =
    'select t_id,count(item) as itemCount from "Lost & Found" group by t_id order by itemCount desc limit 10';
  try {
    const result = await pool.query(query);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error fetching trip report:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.averageOfTotalProfit = async (req, res) => {
  const query = 'select avg(total_profit) from "Manager Finance"';
  try {
    const result = await pool.query(query);
    res.json({ success: true, data: result.row });
  } catch (error) {
    console.error("Error fetching manager report:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.numberOfCarsWithAirConditioningInEachStation = async (req, res) => {
  const query = `const query = 'select count(*),s.station_id from "Car" c,"Driver" d,"Station" s 
                   where d.ssn = c.d_ssn and d.s_id = s.station_id and c.air_conditioning = true
                   group by s.station_id`;
  try {
    const result = await pool.query(query);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error fetching station report:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.getAverageTripDuration = async (req, res) => {
  try {
    const query = `
        SELECT AVG("estimated_time") AS average_trip_duration
        FROM "Trips";
      `;

    const result = await pool.query(query);

    if (
      result.rows.length === 0 ||
      result.rows[0].average_trip_duration === null
    ) {
      return res.status(404).json({
        success: false,
        message: "No trip data available.",
      });
    }

    res.status(200).json({
      success: true,
      average_trip_duration: parseFloat(
        result.rows[0].average_trip_duration
      ).toFixed(2),
    });
  } catch (error) {
    console.error("Error fetching average trip duration:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.getAverageTripCost = async (req, res) => {
  try {
    const query = `
        SELECT AVG("price") AS average_trip_cost
        FROM "Trips";
      `;

    const result = await pool.query(query);

    if (result.rows.length === 0 || result.rows[0].average_trip_cost === null) {
      return res.status(404).json({
        success: false,
        message: "No trip data available.",
      });
    }

    res.status(200).json({
      success: true,
      average_trip_cost: parseFloat(result.rows[0].average_trip_cost).toFixed(
        2
      ),
    });
  } catch (error) {
    console.error("Error fetching average trip cost:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
exports.getUserCounts = async (req, res) => {
  try {
    const passengerQuery = `
        SELECT COUNT(*) AS passenger_count
        FROM "Passenger";
      `;
    const managerQuery = `
        SELECT COUNT(*) AS manager_count
        FROM "Manager";
      `;
    const adminQuery = `
        SELECT COUNT(*) AS admin_count
        FROM "Admin";
      `;
    const driverQuery = `
        SELECT COUNT(*) AS driver_count
        FROM "Driver";
      `;

    const [passengerResult, managerResult, adminResult, driverResult] =
      await Promise.all([
        pool.query(passengerQuery),
        pool.query(managerQuery),
        pool.query(adminQuery),
        pool.query(driverQuery),
      ]);

    res.status(200).json({
      success: true,
      passenger_count: parseInt(passengerResult.rows[0].passenger_count, 10),
      manager_count: parseInt(managerResult.rows[0].manager_count, 10),
      admin_count: parseInt(adminResult.rows[0].admin_count, 10),
      driver_count: parseInt(driverResult.rows[0].driver_count, 10),
    });
  } catch (error) {
    console.error("Error fetching user counts:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.getAverageAgePassenger = async (req, res) => {     // 
  try {
    const query = `
          SELECT AVG("age") AS average_age
          FROM "Passenger";
        `;

    const result = await pool.query(query);

    if (result.rows.length === 0 || result.rows[0].average_age === null) {
      return res.status(404).json({
        success: false,
        message: "No passenger age data available.",
      });
    }

    res.status(200).json({
      success: true,
      average_age: parseFloat(result.rows[0].average_age).toFixed(2),
    });
  } catch (error) {
    console.error("Error fetching average passenger age:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

//get trips per month for each station
exports.getTripsMonthStation = async (req, res) => {
  try {
    const query = `
        SELECT 
          "station_name" AS station, 
          COUNT(*) AS trips
        FROM "Trip", "Station"
        WHERE "source_station" = "station_id"
        GROUP BY station, SUBSTRING("date" FROM 6 FOR 7)
        ORDER BY station, SUBSTRING("date" FROM 6 FOR 7) DESC;
      `;
    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No trip data available for the given criteria.",
      });
    }

    console.log(result.rows);

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching trips per month for each station:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
exports.getManagerFinance = async (req, res) => {
  try {
    const query = `
        SELECT CONCAT("fname", ' ', "lname") AS manager, 
               SUM(salary) AS total_finance
        FROM "Manager Finance", "Manager"
        WHERE EXTRACT(YEAR FROM "date") = EXTRACT(YEAR FROM CURRENT_DATE)
          AND EXTRACT(MONTH FROM "date") = EXTRACT(MONTH FROM CURRENT_DATE) 
          AND "ssn" = "m_ssn"
        GROUP BY manager, TO_CHAR("date", 'YYYY-MM')
        ORDER BY manager, TO_CHAR("date", 'YYYY-MM');
      `;

    const result = await pool.query(query);
    console.log(result.rows);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No finance data available for managers for this month.",
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching manager finance data:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.getStationsRating = async (req, res) => {
  try {
    const query = `
      SELECT "Station"."station_name" AS station,
             COALESCE(AVG("Passenger Trip"."rate"), 0) AS rating
      FROM "Station"
      LEFT JOIN "Trip" ON "Station"."station_id" = "Trip"."source_station"
      LEFT JOIN "Passenger Trip" ON "Trip"."trip_id" = "Passenger Trip"."t_id"
      GROUP BY "Station"."station_name", "Station"."station_id"
      ORDER BY rating DESC;
    `;

    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No rating data available for stations.",
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows,
    });

  } catch (error) {
    console.error("Error fetching stations rating:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
exports.getTripsCountDriverNotPrivatePerMonth = async (req, res) => {
  console.log("getTripsCountDriverNotPrivatePerMonth");
  try {
    const query = `
        SELECT 
          CONCAT("fname", ' ', "lname") AS driver, 
          COUNT(*) AS trips
        FROM "Trip", "Driver"
        WHERE "d_ssn" = "ssn" 
          AND "is_private" = FALSE
          AND TO_DATE("date", 'YYYY-MM-DD') >= DATE_TRUNC('month', CURRENT_DATE) -- Optional: filter for current month
        GROUP BY driver, EXTRACT(YEAR FROM TO_DATE("date", 'YYYY-MM-DD')), EXTRACT(MONTH FROM TO_DATE("date", 'YYYY-MM-DD'))
        ORDER BY driver;
      `;

    const result = await pool.query(query);
    console.log(result.rows);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No trip data available for the given criteria.",
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching trips per month for each driver (not private):", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.getTripsCountDriverPrivatePerMonth = async (req, res) => {
  console.log("getTripsCountDriverNotPrivatePerMonth");
  try {
    const query = `
        SELECT 
          CONCAT("fname", ' ', "lname") AS driver, 
          COUNT(*) AS trips
        FROM "Private Trip", "Driver"
        WHERE "d_ssn" = "ssn" 
          AND "is_private" = TRUE
          AND TO_DATE("date", 'YYYY-MM-DD') >= DATE_TRUNC('month', CURRENT_DATE)
        GROUP BY driver, EXTRACT(YEAR FROM TO_DATE("date", 'YYYY-MM-DD')), EXTRACT(MONTH FROM TO_DATE("date", 'YYYY-MM-DD'))
        ORDER BY driver;
      `;

    const result = await pool.query(query);
    console.log(result.rows);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No trip data available for the given criteria.",
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching trips per month for each driver (not private):", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.getAverageSalaryPerStation = async (req, res) => {
  try {
    const query = `
        SELECT 
          "Station"."station_name" AS station, 
          COALESCE(AVG("Driver"."salary"), 0) AS average_salary
        FROM "Station"
        LEFT JOIN "Driver" ON "Station"."station_id" = "Driver"."s_id"
        GROUP BY "Station"."station_name", "Station"."station_id"
        ORDER BY average_salary DESC;
      `;

    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No salary data available for stations.",
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows,
    });

  } catch (error) {
    console.error("Error fetching average salary per station:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.getAveragePassangersTripPerMonth = async (req, res) => {
  try {
    const query = `
        SELECT 
          SUBSTRING("date" FROM 1 FOR 4) AS year,  -- Extracting the first 4 characters for the year
          SUBSTRING("date" FROM 6 FOR 2) AS month,  -- Extracting the 6th and 7th characters for the month
          COUNT(*) AS passengers
        FROM "Passenger Trip"
        GROUP BY year, month
        ORDER BY year, month;
      `;

    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No passenger trip data available.",
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error("Error fetching average passenger trip per month:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.getPassengerTripsPerMonth = async (req, res) => {
  try {
    const query = `
        SELECT 
          CONCAT("fname" , ' ', "lname") AS passenger,
          COUNT(*) AS trips
        FROM "Passenger Trip", "Passenger"
        WHERE "p_id" = "id"
        GROUP BY "p_id", passenger
        ORDER BY trips DESC;
      `;

    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No passenger trip data available.",
      });
    }

    res.status(200).json({
      success: true,
      data: result.rows,  // This will return each passenger's trips
    });
  } catch (error) {
    console.error("Error fetching passenger trips:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

exports.count_all = async (req, res) => {
    const query1 = 'select count(*) from "Passenger"';
    const query2 = 'select count(*) from "Driver"';
    const query3 = 'select count(*) from "Manager"';
    try
    {
        const result1 = await pool.query(query1);
        const result2 = await pool.query(query2);
        const result3 = await pool.query(query3);
        res.json({success : true, passenger : result1.rows[0].count, driver : result2.rows[0].count, manager : result3.rows[0].count});
    }
    catch(error)
    {
      console.error("Error fetching:", error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again later.",
      });
    }
}

exports.managers_per_location = async (req, res) => {
    const query = 'select count(*) as managersCount,governorate from "Manager","Station" where m_ssn = ssn group by governorate';
    try
    {
        const result = await pool.query(query);
        res.json({success : true, data : result.rows});
    }
    catch(error)
    {
      console.error("Error fetching:", error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again later.",
      });
    }
}

exports.drivers_per_location = async (req, res) => {
   const query = 'select count(*) as driversCount,governorate from "Driver","Station" where s_id = station_id group by governorate';
   try
    {
        const result = await pool.query(query);
        res.json({success : true, data : result.rows});
    }
    catch(error)
    {
      console.error("Error fetching:", error);
      res.status(500).json({
        success: false,
        message: "Server error. Please try again later.",
      });
    }
}

exports.getAverageStationSalary = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT station_name, AVG(salary) AS avg_salary
      FROM "Driver", "Station"
      WHERE "s_id" = "station_id"
      GROUP BY station_name
      ORDER BY avg_salary DESC;
    `);
    res.json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error fetching:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
