import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Nav1 from './navbar.js';

const columns = [
  { field: 'drivId', headerName: 'ID', width: 90 },
  { field: 'descripton', headerName: 'Request', width: 150 },
  { field: 'reqType', headerName: 'Type', width: 150 },
];

export default function Mreq() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch('http://localhost:6969/data')
      .then((response) => response.json())
      .then((data) => setRows(data.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="List">
      <div className="Mreq">
        <div style={{ height: '400px', width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
        </div>
        <div className="button-container">
          <ul className="button-list">
            <li>
              <button id="accept-btn" className="button">Accept</button>
            </li>
            <li>
              <button id="reject-btn" className="button">Reject</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
