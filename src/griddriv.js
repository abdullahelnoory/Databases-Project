import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useHistory } from 'react-router-dom';
export default function Griddriv() {
  const [rows, setRows] = useState([]);

  const [selectedRowIds, setSelectedRowIds] = useState([]);
  
  const history = useHistory();

  const [userssn, setuserssn] = useState(() => {
    const storedSSN = localStorage.getItem('userssn');
    return storedSSN ? JSON.parse(storedSSN).ssn : '';
  });



  const handleSelectionChange = (newSelectionModel) => {
    setSelectedRowIds(newSelectionModel);
  };
  useEffect(() => {
    
    localStorage.setItem("selectedRowIds", JSON.stringify(selectedRowIds));
   // Store the array as a string

    fetch('http://localhost:6969/manager/drivers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        m_ssn: userssn                 // Manager ssn here
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
  }, [selectedRowIds]);

  const columns = [
    { field: 'ssn', headerName: 'SSN', width: 200 },
    { field: 'username', headerName: 'Username', width: 300 },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection  
       onRowSelectionModelChange={(newSelectionModel) => handleSelectionChange(newSelectionModel)}/>
        <div style={{ marginTop: 20 }}>
          <h3>Selected Row ssn:</h3>
          <pre>{JSON.stringify(selectedRowIds, null, 2)}</pre>
          <button className='button' onClick={() => history.push('/M/DriversM/addDriver')} >Add Driver </button>
            <button className='button'>
               Update Salary
            </button>
            <button className='button'>
               Remove Driver
            </button>
        </div>
    </div>
  );
}