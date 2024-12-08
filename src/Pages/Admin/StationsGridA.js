

import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'Stationid', headerName: ' ID', width: 90 },
  { field: 'StationName', headerName: ' Name', width: 90 },
  { field: 'Street', headerName: 'Street', width: 90 },
  { field: 'Zip', headerName: 'ZIP', width: 90 },
  { field: 'Governorate', headerName: 'Governorate', width: 90 },
]
export default function Stationgrid() {

  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [Rows, setRow] = useState([]);
  const handleSelectionChange = (newSelectionModel) => {
    setSelectedRowIds(newSelectionModel);
  };
  useEffect(() => {
    fetch('http://localhost:6969/Stations')
      .then((response) => response.json())
      .then((data) => setRow(data.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

 
  const sendDataDeleteStation = async () => {
    const dataToSend = { selectedRowIds };

    try {
      const response = await fetch('http://localhost:6969/AdminAddStation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();
      console.log('Response from server:', result);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };


  return (
    <div className="List">
      <div style={{ height: '400', width: '100%' }}>
        <DataGrid rows={Rows} columns={columns} pageSize={5} checkboxSelection
          onRowSelectionModelChange={(newSelectionModel) => handleSelectionChange(newSelectionModel)} />
        <div style={{ marginTop: 20 }}>
          <h3>Selected Row IDs:</h3>
          <pre>{JSON.stringify(selectedRowIds, null, 2)}</pre>
        </div>

        <button className='button'>
          <a className='buttonlink' href="/AddStation">Add Station</a>
        </button>
        <button className='button' onClick={sendDataDeleteStation}>
          Delete
        </button>

      </div>
    </div>

  );
}