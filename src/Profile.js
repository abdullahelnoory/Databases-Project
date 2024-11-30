import "./Profile.css";
import React, { useState, useEffect } from "react";

export default function Profile({ flagState }) {
  let [profileState, setProfileState] = useState({
    fname: "",
    mname: "",
    lname: "",
    email: "",
    password: "",
    ssn: "",
    job: "",
  });
  let sendData = {};

  const handleAddUser = async () => {
    try {
      const result = await fetch("http://localhost:6969/accounts/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      });
      const resultInjson = await result.json();
      console.log(resultInjson);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };
  return (
    <form method="post" 
    onSubmit={(event)=>{
      switch (flagState) {
        case "1": {
          setProfileState({ ...profileState, job: "Admin" });
          sendData = { ...profileState, job: "Admin" };
          break;
        }
        case "2": {
          setProfileState({ ...profileState, ssn: "", job: "Passenger" });
          sendData = { ...profileState, ssn: "", job: "Passenger" };
          break;
        }
        case "3": {
          setProfileState({ ...profileState, job: "Manager" });
          sendData = { ...profileState, job: "Manager" };
          break;
        }
        case "4": {
          setProfileState({ ...profileState, job: "Driver" });
          sendData = { ...profileState, job: "Driver" };
          break;
        }
        default:
      }

      event.preventDefault();
  
      handleAddUser();
    }}
    
    className="profile">
      <div className="input">
        <label className="Label" htmlFor="fname">
          {" "}
          First Name
        </label>
        <input
          value={profileState.fname}
          onChange={(event) => {
            setProfileState({ ...profileState, fname: event.target.value });
          }}
          id="fname"
          className="Name"
          required
          type="text"
        ></input>
      </div>

      <div className="input">
        <label className="Label" htmlFor="mname">
          {" "}
          Middle Name
        </label>
        <input
          value={profileState.mname}
          onChange={(event) => {
            setProfileState({ ...profileState, mname: event.target.value });
          }}
          id="mname"
          className="Name"
          required
          type="text"
        ></input>
      </div>

      <div className="input">
        <label className="Label" htmlFor="lname">
          {" "}
          Last Name
        </label>
        <input
          value={profileState.lName}
          onChange={(event) => {
            setProfileState({ ...profileState, lname: event.target.value });
          }}
          id="lname"
          className="Name"
          required
          type="text"
        ></input>
      </div>

      <div className="input">
        <label className="Label" htmlFor="email">
          {" "}
          E-mail
        </label>
        <input
          value={profileState.email}
          onChange={(event) => {
            setProfileState({ ...profileState, email: event.target.value });
          }}
          id="email"
          className="Email"
          required
          type="email"
        ></input>
      </div>

      <div className="input">
        <label className="Label" htmlFor="pass">
          Password
        </label>
        <input
          value={profileState.password}
          onChange={(event) => {
            setProfileState({ ...profileState, password: event.target.value });
          }}
          id="pass"
          className="Password"
          required
          type="password"
        ></input>
      </div>

      {flagState === "2" ? (
        <div className="input" style={{ visibility: "hidden" }}>
          <label className="Label" htmlFor="ssn">
            SSN
          </label>
          <input
            value={profileState.ssn}
            onChange={(event) => {
              setProfileState({ ...profileState, ssn: event.target.value });
            }}
            id="ssn"
            className="SSN"
            type="text"
          ></input>
        </div>
      ) : (
        <div className="input">
          <label className="Label" htmlFor="ssn">
            SSN
          </label>
          <input
            value={profileState.ssn}
            onChange={(event) => {
              setProfileState({ ...profileState, ssn: event.target.value });
            }}
            id="ssn"
            className="SSN"
            required
            type="text"
          ></input>
        </div>
      )}

      <div className="input">
        <button
          className="Submit"
        >
          Sign UP
        </button>
      </div>
    </form>
  );
}
