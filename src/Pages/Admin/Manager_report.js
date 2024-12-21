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

const TotalProfitChart = () => {
  const [managerData, setManagerData] = useState([]);  // Correct variable name for state

  useEffect(() => {
    axios
      .get("http://localhost:6969/report/manager-finances")
      .then((response) => {
        const data = response.data.data;
        if (data && data.length > 0) {
          const transformedData = data.map((item) => ({
            manager: item.manager,
            total_finance: item.total_finance,
          }));
          setManagerData(transformedData);  // Correct state name here
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Manager Net Profit</h2>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={managerData}>  {/* Use managerData instead of data */}
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="manager" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_finance" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalProfitChart;
