import React, { useState, useEffect } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const ManagerialReport= () => {
  const [userCounts, setUserCounts] = useState(null);
  const [managerData, setManagerData] = useState([]);
  const [driverData, setDriverData] = useState([]);
  const [passengerData, setPassengerData] = useState([]);
  // Fetch User Count Data
  useEffect(() => {
    axios
      .get("http://localhost:6969/report/count_all") // Replace with your actual API endpoint
      .then((response) => {
        const data = response.data.data;

        if (data) {
          setUserCounts([
            { name: "Drivers", value: data.drivers },
            { name: "Managers", value: data.managers },
            { name: "Passengers", value: data.passengers },
          ]);
        }
      })
      .catch((error) => {
        console.error("Error fetching user count data:", error);
      });
      axios
      .get("http://localhost:6969/report/managers_per_location") // Replace with your actual API endpoint
      .then((response) => {
        const data = response.data.data;

        if (data && data.length > 0) {
          // Process and store the data
          setManagerData(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching manager data by location:", error);
      });
      axios
      .get("http://localhost:6969/report/drivers_per_location") // Replace with your actual API endpoint
      .then((response) => {
        const data = response.data.data;

        if (data && data.length > 0) {
          // Process and store the data
          setDriverData(data);
        }
      })
      .catch((error) => {
        console.error("Error fetching driver data by location:", error);
      });

      

  }, []);


 

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"]; // Colors for the pie chart

  return (
    <div>
      <h2>User Distribution</h2>
      {userCounts ? (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={userCounts}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              fill="#8884d8"
              label
            >
              {userCounts.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p>Loading data...</p>
      )}

<h2>Number of Managers by Location</h2>
      {managerData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={managerData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="location" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="managers" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>Loading data...</p>
      )}
       <h2>Number of Drivers by Location</h2>
      {driverData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={driverData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="location" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="drivers" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default ManagerialReport;
