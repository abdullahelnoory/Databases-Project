// import Button from "./Button";
import { useState, useEffect } from "react";
// import PopUp from "./PopUp";
import "./ReqStatus.css";
import axios from "axios";
export default function ReqStatus() {
  let [reqState, setReqState] = useState(false);
  let [statusState, setStatusState] = useState([]);

  function HandleReq(event) {
    //Fetch data

  
      setReqState(true); // can make problem so make it in one object
      (async () => {
        try {
          const result = await axios.get(
            "http://localhost:3001/Trips"
          );
          console.log(result.data);
          setStatusState(result.data);
        } catch (error) {
          console.error(error);
        }
      })();
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
      <li key={status.date} className="status">
        Date:{status.date} status: {status.status}
      </li>
    );
  });

  return (
    <>
      <button className="buttonReq" onClick={(event) => HandleReq(event)}>
        {"Requests Day OFF Status"}
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
