import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Passenger_rep = () => {
  const [avgAge, setAvgAge] = useState(null);
  const [passengerTripsData, setPassengerTripsData] = useState([]);

  // Fetch Passenger Age Data
  useEffect(() => {
    axios
      .get("http://localhost:6969/report//passenger-average-age") // Replace with your actual API URL
      .then((response) => {
        const data = response.data.data;

        if (data && data.avg_age !== undefined) {
          // Set the average age
          setAvgAge(data.avg_age);       

          // Set the processed data for the BarChart
          setPassengerAgeData(processedData);
        }
      })
      .catch((error) => {
        console.error("Error fetching passenger age data:", error);
      });

      axios
      .get("http://your-backend-url/api/passenger_trips") // Replace with your actual API endpoint
      .then((response) => {
        const data = response.data;

        if (data && data.length > 0) {
          // Process the data to extract passenger names and their trips
          const processedData = data.map((item) => ({
            passenger_name: item.passenger_name,
            no_of_trips: item.no_of_trips,
          }));

          // Set the processed data for the BarChart
          setPassengerTripsData(processedData);
        }
      })
      .catch((error) => {
        console.error("Error fetching passenger trips data:", error);
      });
  }, []);

  return (
    <div>
    <h2>Average Age</h2>
    {avgAge !== null ? (
      <div
        style={{
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          display: "inline-block",
          backgroundColor: "#f9f9f9",
          fontSize: "24px",
          fontWeight: "bold",
        }}
      >
        {avgAge} years
      </div>
    ) : (
      <p>Loading average age...</p>
    )}

<h2>Passenger Trips</h2>
      {passengerTripsData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={passengerTripsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="passenger_name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="no_of_trips" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>Loading data...</p>
      )}
  </div>
  );
};

export default Pasasenger_rep;
