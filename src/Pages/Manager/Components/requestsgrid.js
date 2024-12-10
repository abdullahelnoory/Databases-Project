import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Nav1 from './navbar.js';

const columns = [
  { field: 'drivId', headerName: 'ID', width: 90 },
  { field: 'descripton', headerName: 'Request', width: 150 },
  { field: 'reqType', headerName: 'Type', width: 150 },
  { field: 'Request_id', headerName: 'Request ID', width: 90 },
];

export default function Mreq() {
  const [rows, setRows] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const userssn = sessionStorage.getItem('ssn');

  const handleSelectionChange = (newSelectionModel) => {
    setSelectedRowIds(newSelectionModel);
    setShowWarning(false); 
  };
  useEffect(() => {
    fetch('http://localhost:6969/manager/requests')
      .then((response) => response.json())
      .then((data) => setRows(data.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);



   const handleAcceptRec = () => {
    if (selectedRowIds.length === 0) {
      setErrorMessage('Please select a Reqest First!');
      setSuccessMessage('');
      return;
    }

    const selectedRequest = selectedRowIds.map((id) => rows.find((row) => row.id === id));

    // const updatedSalary = parseFloat(newSalary);
    // if (isNaN(updatedSalary) || updatedSalary <= 0) {
    //   setErrorMessage('Please enter a valid salary');
    //   setSuccessMessage('');
    //   return;
    // }

    selectedRequest.forEach((Request) => {
      fetch('http://localhost:6969/manager/accept-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          a_ssn: userssn,
          station_id:Request.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setSuccessMessage('Request Accepted successfully');
            setErrorMessage('');
           
          } else {
            console.error('Error Accepting Request:', data);
            setErrorMessage('Failed to Accept Request');
            setSuccessMessage('');
          }
        })
        .catch((error) => {
          console.error('Error Accepting Request:', error);
          setErrorMessage('Error Accepting Request');
          setSuccessMessage('');
        });
    });
  };

  const handleRejectRec = () => {
    if (selectedRowIds.length === 0) {
      setErrorMessage('Please select a Reqest First!');
      setSuccessMessage('');
      return;
    }

    const selectedRequest = selectedRowIds.map((id) => rows.find((row) => row.id === id));

    // const updatedSalary = parseFloat(newSalary);
    // if (isNaN(updatedSalary) || updatedSalary <= 0) {
    //   setErrorMessage('Please enter a valid salary');
    //   setSuccessMessage('');
    //   return;
    // }

    selectedRequest.forEach((Request) => {
      fetch('http://localhost:6969/manager/reject-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          a_ssn: userssn,
          station_id:Request.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setSuccessMessage('Request Rejected successfully');
            setErrorMessage('');
           
          } else {
            console.error('Error Rejecting Request:', data);
            setErrorMessage('Failed to Accept Request');
            setSuccessMessage('');
          }
        })
        .catch((error) => {
          console.error('Error Rejecting Request:', error);
          setErrorMessage('Error Rejecting Request');
          setSuccessMessage('');
        });
    });
  };


  return (
    <div className="List">
      <div className="Mreq">
        
        <div style={{ height: '400px', width: '100%' }}>
          <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection 
          onRowSelectionModelChange={(newSelectionModel) => handleSelectionChange(newSelectionModel)}
          />
        </div>
        <div id="selected-row-preview">
        <h3>Selected Row ssn:</h3>
        <pre>{JSON.stringify(selectedRowIds, null, 2)}</pre>
      </div>

      <div id="messages-container">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
        <div className="button-container">
          <ul className="button-list">
            <li>
              <button id="accept-btn" className="button" onClick={handleAcceptRec}>Accept</button>
            </li>
            <li>
              <button id="reject-btn" className="button" onClick={handleRejectRec}>Reject</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
