import React, { useState, useEffect } from 'react';
import Nav1 from './nav.js';
import axios from"axios"
export default function AddTrip() {

  const [forminput, setforminput] = useState({
    destination_station: "", price: "", ssn: ""
  })

  const sendData = async () => {


    try {
      const response = await fetch('http://localhost:6969/accounts/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(forminput),
      });

      const result = await response.json();
      console.log('Response from server:', result);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };
  const [departments, setDepartments] = useState([]);
  
  
   
  
    useEffect(() => {
      axios
        .get("http://localhost:6969/manager/destination_station")
        .then((response) => setDepartments(response.data))
        .catch((error) => console.error("Error fetching data:", error));
    }, []);
  
   
  
  


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
          <select className="styled-combobox"
              value={forminput.destination_station}
              onChange={(event) => setforminput({ ...forminput, destination_station: event.target.value })}
             
            >
              <option value="">-- Select Destination --</option>
              {departments.map((dest) => (
                <option key={dest.station_id} value={dest.station_name}>{dest.station_name}</option>
              ))}
            </select>
            </div>
            
            <div className="input-container">
              <label>Price</label>
              <input value={forminput.Price} type="text" onChange={(event) => {

                setforminput({ ...forminput, Price: event.target.value })
              }
              }></input>
            </div>
            <button className='button' onClick={sendData}>Submit</button>

          </form>
        </div>
      </div>
    );
  }