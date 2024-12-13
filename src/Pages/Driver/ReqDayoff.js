import "./ReqDayoff.css";
// import Button from "./Button";
import React from "react";
import { useState } from "react";
import PopUp from "./PopUp";
export default function ReqDayoff() {
  const now = new Date();
  let month;
  if (now.getMonth() + 1 / 10 < 1) month = `0${now.getMonth() + 1}`;
  else month = `${now.getMonth() + 1}`;
  let day;
  if (now.getDate() / 10 < 1) day = `0${now.getDate()}`;
  else day = `${now.getDate()}`;
  let today = `${now.getFullYear()}-${month}-${day}`;
  console.log(today);
  let [testState, setTestState] = useState({
    time: today,
    valid: false,
    final: false,
    req: false,
    error: false
  });
  const userssn = sessionStorage.getItem('ssn');
  const handleAddUser = async () => {
    try {
      console.log(testState.time);
      const result = await fetch("http://localhost:6969/driver/request-day-off", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({d_ssn: userssn ,date:testState.time}),
      });
      const resultInjson = await result.json();
      if (resultInjson.success === false)
        setTestState({ ...testState, error: true });
      else
        setTestState({ ...testState, final: true });

      console.log(resultInjson);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  function submitReq(event) {
    event.preventDefault();
    console.log(now.getFullYear());//
    console.log(+testState.time.slice(0, 4));//
    console.log(+month);//12
    console.log(+testState.time.slice(5, 7));
    console.log(+day);
    console.log(+testState.time.slice(8, 10));
    // if(testState.time < today){
    //   setTestState({ ...testState, valid: true });
    // }
    // else{
    //   handleAddUser();
    // }

    if (now.getFullYear() < +testState.time.slice(0, 4)) {
      handleAddUser();
    }
    else {
      if (now.getFullYear() == testState.time.slice(0, 4)) {
        if (
          +month < +testState.time.slice(5, 7)
        )
          handleAddUser();
        else {
          if (
            +month == +testState.time.slice(5, 7)
          ) {
            if (+day < +testState.time.slice(8, 10))
              handleAddUser();
            else
              setTestState({ ...testState, valid: true });
          }
          else
            setTestState({ ...testState, valid: true });

        }
      }
      else
        setTestState({ ...testState, valid: true });
    }
  }



  return (
    <>
      <button
        className="buttonReq"
        onClick={() => setTestState({ ...testState, req: true })}
      >
        {"Request Day OFF"}
      </button>
      {/* {testState.req ? <PopUp /> : null} */}

      {testState.req ? (
        <>
          <form className="popUp" onSubmit={(event) => submitReq(event)}>
            <input
              value={testState.time}
              onChange={(event) =>
                setTestState({ ...testState, time: event.target.value })
              }
              className="date"
              type="date"
            ></input>
            <button className="button10"> {"Request "}</button>
          </form>

          {testState.valid ? (
            <div className="failurepopUp"> FAILURE Wrong Date</div>
          ) : null}

          {testState.error ? (
            <div className="failurepopUp"> Already Requested Date</div>
          ) : null}

          {testState.final ? (
            <div className="failurepopUp"> Suceess Date</div>
          ) : null}

          <div
            className={testState.final ? "formmsucc" : "formm1fail"}
            onClick={() =>
              setTestState({ ...testState, final: false, req: false ,error:false})
            }
          ></div>
          <div
            className={testState.valid || testState.error ? "formmsucc" : "formm1fail"}
            onClick={() => setTestState({ ...testState, valid: false ,final: false ,error:false})}
          ></div>
          <div
            className="formm"
            onClick={() => {
              setTestState({ ...testState, req: false ,error:false});
            }}
          ></div>
        </>
      ) : null}
    </>
  );
}
