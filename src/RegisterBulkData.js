import React, { useState } from "react";
import { generateBulkData } from './generateBulkData';  // Import the generateBulkData function

function RegisterPage() {
  const [bulkData, setBulkData] = useState([]);
  const [numUsers, setNumUsers] = useState(10); // Default to 10 users

  const handleGenerateBulkData = () => {
    const generatedData = generateBulkData(numUsers);  // Call the function to generate data
    console.log("Generated Bulk Data:", generatedData);  // Log the generated data to the console
    setBulkData(generatedData);  // Set the generated data into state
  };

  const handleSubmitBulkData = async () => {
    if (bulkData.length === 0) {
      console.log("No data generated yet. Please generate data before submitting.");
      return;  // Prevent submission if no bulk data is generated
    }

    try {
      const response = await fetch('http://localhost:6969/accounts/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bulkData),
      });

      if (response.ok) {
        console.log("Bulk data submitted successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error during bulk data submission:", errorData);
      }
    } catch (error) {
      console.error("Error during bulk data submission:", error);
    }
  };

  return (
    <div>
      <h2>Bulk Data Generator</h2>
      <label>
        Number of Users:
        <input
          type="number"
          value={numUsers}
          onChange={(e) => setNumUsers(Number(e.target.value))}  // Ensure numUsers is a number
        />
      </label>
      <button onClick={handleGenerateBulkData}>Generate Bulk Data</button>

      <button onClick={handleSubmitBulkData}>Submit Bulk Data</button>

      <div>
        <h3>Generated Data Preview:</h3>
        <pre>{JSON.stringify(bulkData, null, 2)}</pre>
      </div>
    </div>
  );
}

export default RegisterPage;
