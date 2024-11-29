
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'Trip ID', width: 90 },
  { field: 'Driver', headerName: ' Driver Name', width: 150 },
  { field: 'Source', headerName: ' Source', width: 150 },
  { field: 'Destination', headerName: ' Destination', width: 150 },
  { field: 'Price', headerName: ' Price', width: 150 },
  { field: 'estimate time', headerName: ' Estimated Time', width: 150 }
];

export default function Tripslist()
{
    const [rows, setRows] = useState([]);

    useEffect(() => {
      fetch('http://localhost:6969/data')
        .then((response) => response.json())
        .then((data) => setRows(data.data))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);
  
    return (
      <div style={{ height: '400', width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
      </div>
    );
}