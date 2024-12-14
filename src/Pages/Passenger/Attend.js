import "./Attend.css";
import { useState, useEffect } from "react";
import imag from "./pngtree-green-correct-icon-png-image_2912233-removebg-preview__1_-removebg (2).png";
import axios from "axios";
export default function Attend() {
  let [appearState, setAppearState] = useState({appear:true,
    final:false,
  });
  
  const HandleReq = async () => {
    const sendData = { SSN: 12, Attend: true };
    setAppearState({...appearState ,final:true});

    // send reason
    try {
      const result = await fetch("http://localhost:3001/Trips", {
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

    // check if fail due to arrive late or not important

  };
  // style={{display:appearState ? "flex" : "none"}}
  return (
    <div className="containerAttend" style={{visibility:appearState.appear ? "visible" : "hidden"}}>
      <span   onClick={() => HandleReq()} >Mark Attendance</span>

      {/* <button className={"button attend"}> Mark Attendance</button> */}
      {/* <img
        role="button"
        className="imm"
        src={imag}
        onClick={() => HandleReq()}
      ></img> */}

        {appearState.final ? (
          <>
            <div className="failurepopUp"> Suceess Attend</div>
          <div
            className={"formmsucc" }
            onClick={() =>
              setAppearState({ ...appearState, final: false, appear: false })
            }
            ></div>
            </>
        ) 
          : null}
      
    </div>
  );
}
