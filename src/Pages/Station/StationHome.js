import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import '../../styles.css'

export default function Station()
{
  const location = useLocation();
    const [Station,SetStation]=useState({
        station_name: "",
        street: "",
        zipcode: "",
        governorate: "",
        rate:null,
    }
    )
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);
     //assume station id is sent
 useEffect(() => {
  (async () => {
    try {
      const result = await fetch('http://localhost:6969/Passenger/Station'
    , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ st_id: location.state.value }),
    });
    const resultInjson = await result.json();
    console.log(resultInjson);
        if (resultInjson.success) {
          SetStation(resultInjson.data); // Set rows based on the response's `data` field
          setLoading(false);
        } else {
            setErrorMessage('Failed to fetch data');
            setLoading(false);
          }
    }catch(error) {
        console.error('Error fetching data:', error);
        setErrorMessage('Failed to fetch data');
        setLoading(false);
      };
    })();
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