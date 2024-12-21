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
  const [passengerAgeData, setPassengerAgeData] = useState([]);

  // Fetch Passenger Age Data
  useEffect(() => {
    axios
      .get("http://localhost:6969/report//passenger-average-age") // Replace with your actual API URL
      .then((response) => {
        const data = response.data.data;

        if (data && data.length > 0) {
          // Process the data to extract passenger names and their ages
          const processedData = data.map((item) => ({      //
            age: item.average_age,                         //
          }));         

          // Set the processed data for the BarChart
          setPassengerAgeData(processedData);
        }
      })
      .catch((error) => {
        console.error("Error fetching passenger age data:", error);
      });
  }, []);

  return (
    <div>
      {/* Passenger Age Graph */}
      <h2>Passenger Age Distribution</h2>
      {passengerAgeData.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={passengerAgeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="passenger_name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="age" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Pasasenger_rep;
