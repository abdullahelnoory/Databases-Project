import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'ssn', headerName: 'SSN', width: 150 },
  { field: 'fname', headerName: 'First Name', width: 150 },
  { field: 'mname', headerName: 'Middle Name', width: 150 },
  { field: 'lname', headerName: 'Last Name', width: 150 },
];

export default function Areq() {
  const [rows, setRows] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const userssn = sessionStorage.getItem('ssn');

  const handleSelectionChange = (newSelectionModel) => {
    setSelectedRowIds(newSelectionModel);
  };

  useEffect(() => {
    fetch('http://localhost:6969/admin/getUnverifiedManagers')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setRows(data.data); // Set rows based on the response's `data` field
        } else {
          setErrorMessage('Failed to fetch data');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setErrorMessage('Failed to fetch data');
      });
  }, []);

  const handleAcceptRec = () => {
    if (selectedRowIds.length === 0) {
      
      return;
    }
  

    const selectedRequests = selectedRowIds.map((id) => rows.find((row) => row.ssn === id)); // Use ssn to find the request

    selectedRequests.forEach((Request) => {
      fetch('http://localhost:6969/admin/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          a_ssn: userssn,
           m_ssn: selectedRowIds.ssn // Use ssn as the request_id
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setSuccessMessage('Request Accepted successfully');
            setErrorMessage('');
          } else {
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
  
  }
  const handleRejectRec = () => {
    if (selectedRowIds.length === 0) {
    
      return;
    }
  

    const selectedRequests = selectedRowIds.map((id) => rows.find((row) => row.ssn === id)); // Use ssn to find the request

    selectedRequests.forEach((Request) => {
      fetch('http://localhost:6969/admin/reject-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          a_ssn: userssn,
          request_id: Request.ssn,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setSuccessMessage('Request Rejected successfully');
            setErrorMessage('');
          } else {
            setErrorMessage('Failed to Reject Request');
            setSuccessMessage('');
          }
        })
        .catch((error) => {
          console.error('Error Rejecting Request:', error);
          setErrorMessage('Error Rejecting Request');
          setSuccessMessage('');
        });
    });
  }

  return (
    <div className="List">
      <div className="Mreq">
        <div style={{ height: '400px', width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            checkboxSelection
            getRowId={(row) => row.ssn}
            onRowSelectionModelChange={(newSelectionModel) => handleSelectionChange(newSelectionModel)}
          />

        </div>

        <div id="selected-row-preview">
          <h3>Selected Request SSNs:</h3>
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
