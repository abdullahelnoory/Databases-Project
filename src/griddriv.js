import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

export default function Griddriv() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch('http://localhost:6969/manager/drivers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mssn: 1                 // Manager ssn here
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          const transformedData = data.data.map((item, index) => ({
            id: index, 
            ssn: item.ssn,
            username: `${item.fname} ${item.lname}`,
          }));
          setRows(transformedData);
        } else {
          console.error('Error in response:', data);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const columns = [
    { field: 'ssn', headerName: 'SSN', width: 200 },
    { field: 'username', headerName: 'Username', width: 300 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
    </div>
  );
}