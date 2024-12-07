import React, { useState, useEffect } from 'react';
import Nav2 from './Components/navbar';
import axios from 'axios';
import "./styles.css"

export default function Adddriver() {
  const [forminput, setforminput] = useState({
    is_private: "",
    d_ssn: "",
    salary: "",
    shift: "",
    m_ssn: "", // Initially empty
  });
  const [userssn, setUserSSN] = useState("");

  // UseEffect to get userssn from localStorage and set m_ssn
  useEffect(() => {
    const savedData = localStorage.getItem('userssn');
    if (savedData) {
      console.log(savedData);
      const user = JSON.parse(savedData);
      setUserSSN(user.ssn); // Assuming the saved data contains the ssn key
    }
  }, []);

  // UseEffect to set the m_ssn when userssn is available
  useEffect(() => {
    if (userssn) {
      setforminput((prevState) => ({
        ...prevState,
        m_ssn: userssn, // Set m_ssn to the retrieved userssn
      }));
    }
  }, [userssn]);

  const sendData = async () => {
    try {
      const response = await fetch('http://localhost:6969/manager/hire', {
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
      <h2 id="site_Title">Add Driver</h2>
      <div id="Addtrip">
        <form id="Addtrip_box">
          <div id="input-container">
            <label>Driver SSN</label>
            <input
              value={forminput.d_ssn}
              type="text"
              onChange={(event) => {
                setforminput({ ...forminput, d_ssn: event.target.value });
              }}
            />
          </div>

          <div id="input-container">
            <label>Salary</label>
            <input
              value={forminput.salary}
              type="text"
              onChange={(event) => {
                setforminput({ ...forminput, salary: event.target.value });
              }}
            />
          </div>

          <div id="input-container">
            <label>Shift</label>
            <input
              value={forminput.shift}
              type="text"
              onChange={(event) => {
                setforminput({ ...forminput, shift: event.target.value });
              }}
            />
          </div>

          <button id="button" type="button" onClick={sendData}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
