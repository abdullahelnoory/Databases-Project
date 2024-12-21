import "./ReqDayoff.css";
import React from "react";
import { useState } from "react";
export default function ReqDayoff() {
  const now = new Date();
  let month;
  if (now.getMonth() + 1 / 10 < 1) month = `0${now.getMonth() + 1}`;
  else month = `${now.getMonth() + 1}`;
  let day;
  if (now.getDate() / 10 < 1) day = `0${now.getDate()}`;
  else day = `${now.getDate()}`;
  let today = `${now.getFullYear()}-${month}-${day}`;

  let [testState, setTestState] = useState({
    time: today,
    valid: false,
    final: false,
    req: false,
  });

  const handleAddUser = async () => {
    try {
      const result = await fetch("http://localhost:3001/Trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testState.time),
      });
      const resultInjson = await result.json();
      console.log(resultInjson);
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  function submitReq(event) {
    event.preventDefault();

    if (
      now.getFullYear() <= +testState.time.slice(0, 4) &&
      +month <= +testState.time.slice(5, 7) &&
      +day < +testState.time.slice(8, 10)
    ) {

      // try to send data cannot accept due to repeat request day
      handleAddUser();
      // should know if acccept or not
      //if(accepted)
      //      setTestState({ ...testState, final: true });
      //else
      //      setTestState({ ...testState, valid: true });

    } else {
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
            <button className="button"> {"Request "}</button>
          </form>

          {testState.valid ? (
            <div className="failurepopUp"> FAILURE Wrong Date</div>
          ) : null}

          {testState.final ? (
            <div className="failurepopUp"> Suceess Date</div>
          ) : null}

          <div
            className={testState.final ? "formmsucc" : "formm1fail"}
            onClick={() =>
              setTestState({ ...testState, final: false, req: false })
            }
          ></div>
          <div
            className={testState.valid ? "formmsucc" : "formm1fail"}
            onClick={() => setTestState({ ...testState, valid: false })}
          ></div>
          <div
            className="formm"
            onClick={() => {
              setTestState({ ...testState, req: false });
            }}
          ></div>
        </>
      ) : null}
    </>
  );
}
