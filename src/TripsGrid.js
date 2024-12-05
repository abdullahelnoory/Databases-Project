import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'Trip ID', width: 90 },
  { field: 'Driver', headerName: 'Driver Name', width: 150 },
  { field: 'Source', headerName: 'Source Station', width: 150 },
  { field: 'Destination', headerName: 'Destination Station', width: 150 },
  { field: 'Price', headerName: 'Price', width: 150 },
  { field: 'EstimatedTime', headerName: 'Estimated Time (mins)', width: 150 },
];

export default function Tripslist() {
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [rows, setRows] = useState([]);
  
  const [userssn, setuserssn] = useState(() => {
    const storedSSN = localStorage.getItem('userssn');
    return storedSSN ? JSON.parse(storedSSN).ssn : '';
  });

  const handleSelectionChange = (newSelectionModel) => {
    setSelectedRowIds(newSelectionModel);
  };

  useEffect(() => {
    fetch('http://localhost:6969/manager/trips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        m_ssn: userssn, // Manager SSN here
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.data) {
          const transformedData = data.data.map((trip) => ({
            id: trip.trip_id,
            Driver: trip.d_ssn,
            Source: trip.source_station,
            Destination: trip.destination_station,
            Price: trip.price,
            EstimatedTime: trip.estimated_time,
          }));
          setRows(transformedData);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const sendDataAddt = async () => {
    const dataToSend = { selectedRowIds };

    try {
      const response = await fetch('http://localhost:6969/manager/create-trips', {
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
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          onRowSelectionModelChange={(newSelectionModel) => handleSelectionChange(newSelectionModel)}
        />
        <div style={{ marginTop: 20 }}>
          <h3>Selected Row IDs:</h3>
          <pre>{JSON.stringify(selectedRowIds, null, 2)}</pre>
        </div>

        <button className="button">
          <a className="buttonlink" href="/AddTrip">Add Trip</a>
        </button>
        <button className="button" onClick={() => console.log('Set price clicked')}>Set price</button>
        <button className="button" onClick={() => console.log('Set destination clicked')}>Set Destination</button>
      </div>
    </div>
  );
}
