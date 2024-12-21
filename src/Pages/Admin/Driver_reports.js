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

const  Driver_report = () => {
const [driverTripsData, setDriverTripsData] = useState([]);
const [driverTripsDataprivate, setDriverTripsDataprivate] = useState([]);

  // Fetch Driver Trips Data
  useEffect(() => {
    axios
      .get("http://localhost:6969/report/driver-trips-not-private") // Replace with your actual API URL
      .then((response) => {
        const data = response.data.data;
         
        if (data && data.length > 0) {
          // Process the data to extract driver names and trips
          const processedData = data.map((item) => ({
            driver_name: item.driver,               //driver_name
            trips: item.trips,                            //trips
          }));

          // Set the processed data for the BarChart
          setDriverTripsData(processedData);
        }
      })
      .catch((error) => {
        console.error("Error fetching driver trips data:", error);
      });

      axios
      .get("http://localhost:6969/report/driver-trips-private") // Replace with your actual API URL
      .then((response) => {
        const data = response.data.data;
         
        if (data && data.length > 0) {
          // Process the data to extract driver names and trips
          const processedData = data.map((item) => ({
            driver_name: item.driver,               //driver_name
            trips: item.trips,                            //trips
          }));

          // Set the processed data for the BarChart
          setDriverTripsDataprivate(processedData);
        }
      })
      .catch((error) => {
        console.error("Error fetching driver trips data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Driver Trips Count</h2>
      {driverTripsData.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={driverTripsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="driver_name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="trips" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      )}
       <h2>Driver Trips Count</h2>
      {driverTripsDataprivate.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={driverTripsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="driver_name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="trips" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Driver_report;
