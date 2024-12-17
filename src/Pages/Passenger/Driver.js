import "./Driver.css";
import { useState, useEffect } from "react";
import Header from "./Header";
import Button from "./Button";
import ReqDayoff from "./ReqDayoff";
import PopUp from "./PopUp";
import ReqStatus from "./ReqStatus";
import Resign from "./Resign";
import Attend from "./Attend";
import Trips from "./Trips";
import axios from "axios";
function Driver() {
  // fetch data to see if there is notification or not
  let [recievedData, setRecievedData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get("http://localhost:3001/Trips");
        //npm install -g json-server
        //& "C:\Users\Jo\AppData\Roaming\npm\json-server.cmd" db.json& "C:\Users\Jo\AppData\Roaming\npm\json-server.cmd" db.json

        // console.log(result.data);
        // const jsonResult = await result.data;
        setRecievedData(result.data[0]);

        // console.log(recievedData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div style={{}}>
      {/* <Header /> */}
      <div className="header">
        Driver
        {recievedData.SSN}
      </div>
      {/* <h1>{recievedData.fName}</h1> */}
      {/* <Button> {"Request Day OFF"}</Button> */}
      {/* when driver open I will fetch data to know if he has added the information about his car or not  */}
      <ReqDayoff />
      {/* It will be inside ReqDayoff but is is here just for test */}
      {/* <PopUp /> */}
      {/* <Button> {"Requested Days OFF to see the status"}</Button> */}
      <ReqStatus />

      {/* <Button> {"Mark Attendance"}</Button> */}
      <Attend />

      {/* <Button> {"Resign"}</Button> */}
      <Resign />

      <Trips flagNotifiaction={true} />

      {/* <Button> {"Set Estimated Time For Trip"}</Button>
      <Button> {"Set Estimated Time For Private Trip"}</Button>
      <Button> {"Accept Private Trip"}</Button>
      <Button> {"Reject Private Trip"}</Button> */}
      {/* <Button> {"Report Lost&found in Trip"}</Button> */}
      {/* private trip has 8 attributes 
      first 6 are : Date Price  Estimatedtime OrderId Source Destination 
      the last two are foreign Keys : Driver and Passenger*/}
    </div>
  );
}

export default Driver;
