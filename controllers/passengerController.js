const pool = require('../models/db')

exports.rateTrip = async (req, res) => {
    const {p_id, t_id, rate, comment} = req.body;
    const query1 = 'select * from "Review" where p_id = $1 and t_id = $2';
    try
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