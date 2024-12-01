import "./Profile.css";
import React, { useState, useEffect } from "react";

export default function Profile({ currJob, prevJob }) {
  let [ssnState, setSsnState] = useState("");
  let [ageState, setAgeState] = useState("");
  let [carState, setCarState] = useState("");
  let [profileState, setProfileState] = useState({
    fname: "",
    mname: "",
    lname: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (currJob !== prevJob) {
      // setProfileState({
      //   fname: "",
      //   mname: "",
      //   lname: "",
      //   email: "",
      //   password: "",
      // });
      if (currJob === "Passenger") setSsnState("");
      setAgeState("");
      setCarState("");
    }
  }, [currJob, prevJob]);
  function handleSendData() {
    let sendData = [];
    switch (currJob) {
      case "Admin": {
        sendData = { ...profileState, job: currJob, ssn: ssnState };
        break;
      }
      case "Passenger": {
        sendData = { ...profileState, job: currJob, age: ageState };
        break;
      }
      case "Manager": {
        sendData = { ...profileState, job: currJob, ssn: ssnState };
        break;
      }
      case "Driver": {
        sendData = {
          ...profileState,
          job: currJob,
          ssn: ssnState,
          car: carState,
        };
        break;
      }
      default:
    }
    setProfileState({
      fname: "",
      mname: "",
      lname: "",
      email: "",
      password: "",
    });
    setSsnState("");
    setAgeState("");
    setCarState("");
    handleAddUser(sendData);
  }

  const handleAddUser = async (sendData) => {
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
    <form
      method="post"
      onSubmit={(event) => {
        event.preventDefault();
        handleSendData();
      }}
      className="profile"
    >
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
          value={profileState.lname}
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

      {currJob === "Passenger" ? (
        <div className="input">
          <label className="Label" htmlFor="age">
            Age
          </label>
          <input
            value={ageState}
            onChange={(event) => {
              setAgeState(event.target.value);
            }}
            id="age"
            className="Age"
            required
            type="text"
          ></input>
        </div>
      ) : (
        <div className="input">
          <label className="Label" htmlFor="ssn">
            SSN
          </label>
          <input
            value={ssnState}
            onChange={(event) => {
              setSsnState(event.target.value);
            }}
            id="ssn"
            className="SSN"
            required
            type="text"
          ></input>
        </div>
      )}

      {currJob === "Driver" ? (
        <div className="carInput">
          <label className="Label" htmlFor="car">
            Car ID
          </label>
          <input
            value={carState}
            onChange={(event) => {
              setCarState(event.target.value);
            }}
            id="car"
            className="Car"
            required
            type="text"
          ></input>
        </div>
      ) : (
        <div className="carInput" visibility="hidden"></div>
      )}

      <div className="input">
        <button className="Submit">Sign UP</button>
      </div>
    </form>
  );
}
