const pool = require('../models/db')

exports.rateTrip = async (req, res) => {
    const {p_id, t_id, rate, comment} = req.body;
    const query1 = 'select * from "Review" where p_id = $1 and t_id = $2';
    const query_c = 'select count(*) from "Review" where t_id = $1';
    try
    {
        const result_c = await pool.query(query_c, [t_id]);
        if(result_c.rows[0].count >= 25)
        {
            res.json({success : true, message : "Sorry, this trip was rated by 25 passengers and this is the maximum number of rates."});
        }
        else
        {
            const result1 = await pool.query(query1, [p_id, t_id]);
            if(result1.rows.length == 0)
            {
                const query2 = 'insert into "Review" values($1, $2, $3, $4)';
                await pool.query(query2, [p_id, t_id, rate, comment]);
                res.json({success : true, message : "A new rate is inserted!"});
            }
            else
            {
                const query3 = 'update "Review" set rate = $1, comment = $2 where p_id = $3 and t_id = $4';
                await pool.query(query3, [rate, comment, p_id, t_id]);
                res.json({success : true, message : "This passenger has rated the same trip before so the rate is updated!"});
            }
        }
    }
    catch (error) 
    {
        if(error.code == "23503")
        {
            res.json({
                success : false , 
                message : "The inserted passenger or trip doesn't exist in the system!", 
                details : error.detail});
        }
        else
        {
            console.error("Error connecting to the database:", error);
            res.status(500).json({
                success: false,
                message: "Database connection failed",
            });
        }
    }
};

exports.orderPrivateTrip = async (req, res) => {
    const {source, destination, data, p_id} = req.body;
    const query = 'insert into "Private Trip" (source, destination, data, p_id) values($1, $2, $3, $4)';
    try
    {
        await pool.query(query, [source, destination, data, p_id]);
        res.json({success : true, message : "Your request is recorded successfully!"});
    }
    catch(error)
    {
        if(error.code == "23503")
        {
            res.json({
                success : false , 
                message : "The inserted passenger or trip doesn't exist in the system!", 
                details : error.detail});
        }
        else
        {
            console.error("Error connecting to the database:", error);
            res.status(500).json({
                success: false,
                message: "Database connection failed",
            });
        }
    }
};

exports.requestTrip = async (req, res) => {
    const {p_id, t_id} = req.body;
    const query1 = 'select number_of_seats from "Car" c,"Driver" d,"Trip" t where c.d_ssn = d.ssn and d.ssn = t.d_ssn and t.trip_id = $1';
    const query2 = 'select count(*) from "Passenger Trip" where t_id = $1';
    const query3 = 'insert into "Passenger Trip" values($1, $2,false)';
    try
    {
        const result1 = await pool.query(query1, [t_id]);
        if(result1.rows.length == 0)
            res.json({success : true, message : "This trip is not found!"});
        const number_of_seats = result1.rows[0].number_of_seats;
        const result2 = await pool.query(query2,[t_id]);
        if(result2.rows[0].count < number_of_seats)
        {
            await pool.query(query3,[p_id, t_id]);
            res.json({success : true, message : "The trip is requested successfully!"});
        }
        else
            res.json({success : true, message : "Sorry, the trip is full now!"});
    }
    catch(error)
    {
        if(error.code == "23503")
            {
                res.json({
                    success : false , 
                    message : "The inserted passenger or trip doesn't exist in the system!", 
                    details : error.detail});
            }
            else
            {
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
    const query = 'select s.station_name as source,d.station_name as destination from "Trip" t,"Passenger Trip" pt,"Station" s, "Station" d where t.trip_id = pt.t_id and s.station_id = t.source_station and d.station_id = t.destination_station and pt.p_id = $1';
    try
    {
        const result = await pool.query(query,[p_id]);
        res.json({success : true, data : result.rows});
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

 exports.setFavouriteTrip = async (req, res) => {
    const {p_id, t_id, isFavourite} = req.body;
    const query = 'update "Passenger Trip" set is_favourite = $1 where p_id = $2 and t_id = $3';
    try
    {
        await pool.query(query,[isFavourite,p_id,t_id]);
        res.json({success : true , Message : "The operation is done successfully!"});
    }
    catch(error)
    {
        if(error.code == "23503")
            {
                res.json({
                    success : false , 
                    message : "The passenger or the trip doesn't exist in the system!", 
                    details : error.detail});
            }
            else
            {
                console.error("Error connecting to the database:", error);
                res.status(500).json({
                    success: false,
                    message: "Database connection failed",
                });
            }
    }
 };