import React, { useState, useEffect } from 'react';
import Nav1 from './nav.js';
import axios from "axios";

export default function AddTrip() {
  const [forminput, setforminput] = useState({
    destination_station: "", price: ""
  });
  const [userssn, setuserssn] = useState(() => {
    const storedSSN = localStorage.getItem('userssn');
    return storedSSN ? JSON.parse(storedSSN).ssn : '';
  });
  const sendData = async () => {
    try {
      const currentDateTime = new Date().toISOString();

      const payload = {
        destination_station: forminput.destination_station,
        price: forminput.price,
        m_ssn: userssn,
        date: currentDateTime
      };
      const response = await fetch('http://localhost:6969/manager/create-trips', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log('Response from server:', result);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  const [destinationStations, setDestinationStations] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:6969/manager/stations", { m_ssn: userssn })
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setDestinationStations(response.data.data);
        } else {
          console.error("Unexpected response format:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [userssn]);

  return (
    <div>
      <header>
        <Nav1 />
      </header>
      <h2 className="site_Title">Add Trip</h2>
      <div className='Addtrip'>
        <form className='Addtrip_box'>
          <div className="combobox-container">
            <label>Destination</label>
            <select
              className="styled-combobox"
              value={forminput.destination_station}
              onChange={(event) =>
                setforminput({ ...forminput, destination_station: event.target.value })
              }
            >
              <option value="">-- Select Destination --</option>
              {destinationStations.map((station) => (
                <option key={station.station_id} value={station.station_id}>
                  {station.station_name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-container">
            <label>Price</label>
            <input
              value={forminput.price}
              type="text"
              onChange={(event) =>
                setforminput({ ...forminput, price: event.target.value })
              }
            />
          </div>

          <button
            className='button'
            type="button"
            onClick={sendData}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
