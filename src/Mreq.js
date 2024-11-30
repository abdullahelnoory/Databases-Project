
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'drivId', headerName: 'ID', width: 90 },
  { field: 'descripton', headerName: 'Requset', width: 150 },
  { field: 'reqType', headerName: 'Type', width: 150 },
];


export default function Mreq()
{
    const [rows, setRows] = useState([]);

    useEffect(() => {
      fetch('http://localhost:6969/data')
        .then((response) => response.json())
        .then((data) => setRows(data.data))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);
  
    return (
        <div className="Mreq">
      <div style={{ height: '400', width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
      </div>
      <button> Accept</button>
      <button>
        Reject
      </button>
      </div>
    );
}