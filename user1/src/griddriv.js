import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'task', headerName: 'Name', width: 150 },
 
];

export default function Griddriv() {
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