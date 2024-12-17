import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import '../../styles.css'

export default function Station()
{
    const [Station,SetStation]=useState({
        station_name: "",
        street: "",
        zipcode: "",
        governorate: "",
    }
    )
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
     //assume station id is sent
 useEffect(() => {
    fetch('http://localhost:6969/Station')
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          SetStation(data.data); // Set rows based on the response's `data` field
          setLoading(false);
        } else {
            setErrorMessage('Failed to fetch data');
            setLoading(false);
          }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setErrorMessage('Failed to fetch data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (errorMessage) {
    return <div className="error-message">{errorMessage}</div>;
  }

    return(
        <div className="station-container">
        <div className="station-card">
          <h1 className="station-name">{Station.station_name}</h1>
          <div className="station-address">
            <p>{Station.governorate}</p>
            <p>{Station.zipcode}</p>
            <p>{Station.street}</p>
          </div>
        </div>
      </div>

    );
}