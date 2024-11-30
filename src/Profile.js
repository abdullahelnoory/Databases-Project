import "./Profile.css";
import React, { useState, useEffect } from "react";

export default function Profile({ flagState }) {
  let [profileState, setProfileState] = useState({
    fName: "",
    mName: "",
    lName: "",
    Email: "",
    Pass: "",
    SSN: "",
    RoleId: "",
  });
  const handleAddUser = async () => {
    try {
      const result = await fetch("http://localhost:6969/RegisterPage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileState),
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
        if (flagState == "-1") event.preventDefault();
        setProfileState({ ...profileState, RoleId: flagState });
        if (flagState == "2") setProfileState({ ...profileState, SSN: "" });
        event.preventDefault();
      }}
      className="profile"
    >
      <div className="input">
        <label className="Label" htmlFor="fname">
          {" "}
          First Name
        </label>
        <input
          value={profileState.fName}
          onChange={(event) => {
            setProfileState({ ...profileState, fName: event.target.value });
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
          value={profileState.mName}
          onChange={(event) => {
            setProfileState({ ...profileState, mName: event.target.value });
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
            setProfileState({ ...profileState, lName: event.target.value });
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
          value={profileState.Email}
          onChange={(event) => {
            setProfileState({ ...profileState, Email: event.target.value });
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
          value={profileState.Pass}
          onChange={(event) => {
            setProfileState({ ...profileState, Pass: event.target.value });
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
            value={profileState.SSN}
            onChange={(event) => {
              setProfileState({ ...profileState, SSN: event.target.value });
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
            value={profileState.SSN}
            onChange={(event) => {
              setProfileState({ ...profileState, SSN: event.target.value });
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
          onClick={(event) => {
            handleAddUser();
          }}
        >
          {" "}
          Sign UP
        </button>
      </div>
    </form>
  );
}
