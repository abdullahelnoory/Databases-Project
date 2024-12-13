// import Button from "./Button";
import { useState, useEffect } from "react";
// import PopUp from "./PopUp";
import "./ReqStatus.css";
import axios from "axios";
export default function ReqStatus() {
  let [reqState, setReqState] = useState(false);
  let [statusState, setStatusState] = useState([]);
  const userssn = sessionStorage.getItem('ssn');
  function HandleReq(event) {
    //Fetch data


    setReqState(true); // can make problem so make it in one object
    //   (async () => {
    //     try {
    //       const result = await axios.get(
    //         "http://localhost:3001/Trips"
    //       );
    //       console.log(result.data);
    //       setStatusState(result.data);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   })();
    // }

    (async () => {
      try {
        const result = await fetch("http://localhost:6969/driver/get-day-off-requests", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ d_ssn: userssn }),
        });
        const resultInjson = await result.json();
        console.log(resultInjson.data);
        setStatusState(resultInjson.data);
      } catch (error) {
        console.error(error);
      }
    })();
  };



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
      <div key={status.date} className="status">
        Date:{status.date.slice(0,10)} Status: {status.status}
      </div>

    );
  });

  return (
    <>
      <button className="buttonReq" onClick={(event) => HandleReq(event)}>
        {"Requests Day OFF Status"}
      </button>

      {reqState ? (
        <>
          <div className="popUpstate" style={{overflowY:"scroll"}}>
            <div style={{display:"flex",flexDirection:"column"}}>{StatusList}</div>
          </div>
          <div className="formm" onClick={() => setReqState(false)}></div>
        </>
      ) : null}
    </>
  );
}
