import "./RegisterPage.css";
import Header from "./Header.js";
import User from "./User.js";
import { useState } from "react";
import Profile from "./Profile.js";
import imag from "./white_on_trans.png";
function RegisterPage() {
  let headStyle = {
    color: "#fff4f4db",
    width: "80%",
    textAlign: "center",
  };
  let pStyle = {
    color: "rgba(255, 244, 244, 0.86)",
    fontSize: "xx-large",
    fontFamily: "ui-sans-serif",
  };
  let [state, setState] = useState("-1");
  let [prevState, setPrevState] = useState("-1");

  let [flagState, setFlagState] = useState("card");

  let x = (event) => {

    if (state == "-1") {
      setPrevState(state);
      setState(event.target.id);
    } else {
      if (state == event.target.id) {
        setPrevState(state);
        setState(-1);
      } else {
        setPrevState(state);
        setState(event.target.id);
      }
    }
  };

  let users = [
    {
      tabIndex: 1,
      title: "Admin",
      role: "Admin",
      id: 1,
    },
    {
      tabIndex: 2,
      title: "Passenger",
      role: "Passenger",
      id: 2,
    },
    {
      tabIndex: 3,
      title: "Manager",
      role: "Manager",
      id: 3,
    },
    {
      tabIndex: 4,
      title: "Driver",
      role: "Driver",
      id: 4,
    },
  ];

  let UsersList = users.map(function (user) {
    return (
      <User
        onclick={x}
        key={user.id}
        tabIndex={user.tabIndex}
        title={user.title}
        id={user.id}
        classname={
          user.id == state ? (user.id == prevState ? "card" : "Active") : "card"
        }
        role={user.role}
      />
    );
  });

  return (
    <div className="RegisterPage">
      <Header />

      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexWrap: "wrap",
          height: "400px",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "flex-start",
            margin: "20px",
            height: "200px",
          }}
        >
          {UsersList}
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            height: "500px",
            flexDirection: "row-reverse",
          }}
        >
          {state === "2" ? (
            <Profile flagState={"Active"} setFlagState={setFlagState} />
          ) : (
            <Profile flagState={"card"} setFlagState={setFlagState} />
          )}

          <div
            style={{
              width: "30%",
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              alignContent: "flex-start",
              height: "100%",
              flexWrap: "wrap",
              backgroundColor: "rgb(39 39 52",
              borderRadius: "10px",
            }}
          >
            <h1 style={headStyle}>SWIFT ROUTE</h1>
            <p style={pStyle}>Wherever you are We will help you</p>
            <img
              style={{
                width: "100%",
                height: "50%",
              }}
              src={imag}
              alt="Logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
