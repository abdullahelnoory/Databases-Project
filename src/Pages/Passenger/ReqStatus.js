// import Button from "./Button";
import { useState, useEffect } from "react";
// import PopUp from "./PopUp";
import "./ReqStatus.css";

export default function ReqStatus() {
  let [reqState, setReqState] = useState(false);
  let [statusState, setStatusState] = useState([]);
  const userID = sessionStorage.getItem("ssn");
  
  function HandleReq(event) {
    setReqState(true);
    //Fetch data
    (async () => {
      try {
        const result = await fetch(
          "http://localhost:6969/passenger/getStatusPrivateTrips",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ p_id: userID }),
          }
        );
        const resultInjson = await result.json();
        // console.log(resultInjson.data);
        setStatusState( resultInjson.data);
      } catch (error) {
        console.error(error);
      }
    })();
    // can make problem so make it in one object
  }

  // useEffect(() => {
  //   setReqState(true); // can make problem so make it in one object
  //   const fetchData = async () => {
  //     const result = await fetch(
  //       "http://localhost:6969/accounts/Driver/RequestStatus"
  //     );
  //     const jsonResult = await result.json();
  //     setStatusState(jsonResult);
  //   };
  // }, []);

  // let [statusState, setStatusState] = useState([
  //   { date: "curr dte", status: "rejected" },
  //   { date: "curr dte2", status: "Accepted" },
  // ]);




  let StatusList = statusState.map(function (status) {
    return (
      <li key={status.source} className="status">
        Source:{status.source} Destination: {status.destination}
      </li>
    );
  });





  return (
    <>
      <button className="buttonReq" onClick={(event) => HandleReq(event)}>
        {"Requests Private Trips Status"}
      </button>

      {reqState ? (
        <>
          <div className="popUpstate">
            <ul>{StatusList}</ul>
          </div>
          <div className="formm" onClick={() => setReqState(false)}></div>
        </>
      ) : null}
    </>
  );
}
