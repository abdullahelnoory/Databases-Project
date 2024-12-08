import React, { useState, useEffect } from 'react';
import Nav2 from './Components/navbar';
import "./styles.css";

export default function Adddriver() {
  const [forminput, setforminput] = useState({
    d_ssn: "",
    salary: "",
    shift: "",
    m_ssn: "",
  });
  const userssn = sessionStorage.getItem('ssn');
  const [message, setMessage] = useState(""); // For both success and error messages

  useEffect(() => {
    if (userssn) {
      setforminput((prevState) => ({
        ...prevState,
        m_ssn: userssn,
      }));
    }
  }, [userssn]);

  const validateForm = () => {
    for (let key in forminput) {
      if (forminput[key].trim() === "") {
        console.log(`Validation failed at ${key}: ${forminput[key]}`);
        return "Please fill in all fields.";
      }
    }
    return null;
  };

  const sendData = async () => {
    const validationError = validateForm();
    if (validationError) {
      setMessage({ type: 'error', text: validationError });
      return; // Prevent form submission if validation fails
    }

    // Clear previous messages before sending data
    setMessage("");

    try {
      const response = await fetch('http://localhost:6969/manager/hire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(forminput),
      });

      const result = await response.json();
      if (result.success) {
        setMessage({ type: 'success', text: 'Driver hired successfully!' });
      } else {
        setMessage({ type: 'error', text: result.message || "An error occurred." });
      }
    } catch (error) {
      console.error('Error sending data:', error);
      setMessage({ type: 'error', text: "An error occurred while sending the data." });
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

          {message && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <button id="button" type="button" onClick={sendData}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
