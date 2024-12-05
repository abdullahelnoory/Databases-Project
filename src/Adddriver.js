import React, { useState, useEffect } from 'react';
import Nav2 from './nav';
import axios from "axios"


export default function Adddriver() {


  const [forminput, setforminput] = useState({
    is_private: "",
    d_ssn: "", salary: "", shift: "", m_ssn: "",
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

  return (
    <div>
      <header>
        <Nav2 />
      </header>
      <h2 className="site_Title">Add Driver</h2>
      <div className='Addtrip'>

        <form className='Addtrip_box'>

          <div className="input-container">
            <label>Driver SSN</label>
            <input value={forminput.d_ssn} type="text" onChange={(event) => {
              setforminput({ ...forminput, d_ssn: event.target.value })
            }
            }></input>
          </div>

          <div className="input-container">
            <label >  Salary </label>
            <input value={forminput.salary} type="text" onChange={(event) => {

              setforminput({ ...forminput, salary: event.target.value })
            }
            }>
            </input>
          </div>

          <div className="input-container">
            <label > Shift </label>
            <input value={forminput.shift} type="text" onChange={(event) => {

              setforminput({ ...forminput, shift: event.target.value })
            }
            }>
            </input>
          </div>

          <button className='button' onClick={sendData}>Submit</button>

        </form>
      </div>
    </div>


  );
}