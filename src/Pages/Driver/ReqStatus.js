// import Button from "./Button";
import { useState, useEffect } from "react";
// import PopUp from "./PopUp";
import "./ReqStatus.css";
import axios from "axios";
export default function ReqStatus() {
  let [reqState, setReqState] = useState(false);
  let [statusState, setStatusState] = useState([]);
  const userssn = sessionStorage.getItem("ssn");
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
        const result = await fetch(
          "http://localhost:6969/driver/get-day-off-requests",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ d_ssn: userssn }),
          }
        );
        const resultInjson = await result.json();
        console.log(resultInjson.data);
        setStatusState(resultInjson.data);
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

  let StatusListFirst = statusState.map(function (status) {
    return (
      <div class="item-status" key={status.date} >
        {status.date.slice(0, 10)}
      </div>
    );
  });
  let StatusListSecond = statusState.map(function (status) {
    return (
      <div class="item-status" key={status.date} >
        {status.status}
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
          {/* <div className="popUpstate" style={{ overflowY: "scroll" }}> */}
            {/* <div style={{display:"flex",flexDirection:"column"}}>{StatusList}</div> */}

            <div class="card-status" >
              <div class="card-status__title">Status of Vacations</div>
              <div class="card-status__data">
                <div class="card-status__right">
                  <div class="item-status">Date</div>
                  {StatusListFirst}
                </div>
                <div class="card-status__left">
                  <div class="item-status">Status</div>
                  {StatusListSecond}
                </div>
              </div>
            </div>
          {/* </div> */}
          <div className="formm" onClick={() => setReqState(false)}></div>
         
        </>
      ) : null}
    </>
  );
}
