
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
/*const hardcodedRows = [
  { id: 1, Driver: 'John Doe', Source: 'New York', Destination: 'Boston', Price: 120, estimateTime: 180 },
  { id: 2, Driver: 'Jane Smith', Source: 'Los Angeles', Destination: 'San Francisco', Price: 150, estimateTime: 300 },
  { id: 3, Driver: 'Mike Johnson', Source: 'Houston', Destination: 'Dallas', Price: 100, estimateTime: 240 },
  { id: 4, Driver: 'Emily Davis', Source: 'Chicago', Destination: 'Detroit', Price: 90, estimateTime: 210 },
  { id: 5, Driver: 'Chris Brown', Source: 'Miami', Destination: 'Orlando', Price: 80, estimateTime: 200 },
];*/

export default function Tripslist()
{    const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [Rows, setRow] = useState([]);
  const handleSelectionChange = (newSelectionModel) => {
    setSelectedRowIds(newSelectionModel);
  };
    useEffect(() => {
      fetch('http://localhost:6969/data')
        .then((response) => response.json())
        .then((data) => setRow(data.data))
        .catch((error) => console.error('Error fetching data:', error));
    }, []);
    
  
    const sendDataAddt = async () => {
      const dataToSend = { selectedRowIds };
    
      try {
        const response = await fetch('http://localhost:6969/ManagerCreatetrip', {
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
      <a  className='buttonlink' href="/AddTrip">Add Trip</a>
    </button>
    <button className='button'>
        Set price
    </button>
    <button className='button'>
        Set Destination
    </button>
    </div>
      </div>
    );
}