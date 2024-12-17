import "./Resign.css";
import { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
export default function Resigon() {
  let [reasonState, setReasonState] = useState("");
  const [PopupOpen, setPopupOpen] = useState(false);
  const handleSubmit = async () => {
    const sendState = { SSN: 21, Reason: reasonState };
    // send reason
    try {
      const result = await fetch("http://localhost:3001/Trips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendState),
      });
      const resultInjson = await result.json();
      console.log(resultInjson);
    } catch (error) {
      console.error("Error adding user:", error);
    }
    setReasonState("");
  };

  return (
    <div>
      {/* <h4> Resign </h4> */}
      <Popup
        contentStyle={{ border: "0", background: "none" }}
        trigger={<button className="buttonReq"> Resign </button>}
        position="bottom center"
        open={PopupOpen}
        onClose={() => {
          setReasonState(""); // Close popup
        }} // Your extra function
      >
        <form
          method="post"
          className="popUpp"
          onSubmit={(event) => {
            console.log(reasonState);
            handleSubmit();
            event.preventDefault();
          }}
        >
          <span className="reasonfont"> Write Your Reason</span>
          {/* <input type="text" size="10" ></input> */}
          <textarea
            value={reasonState}
            onChange={(event) => setReasonState(event.target.value)}
            style={{
              height: "60%",
              padding: "5px",
              backgroundColor: "#ecf0f1",
              outlineColor:"#1abc9c"
            }}
          ></textarea>
          <button
            className="buttonReq"
            style={{ alignSelf: "center"}}
          >
            {" "}
            Send Request
          </button>
        </form>
      </Popup>
    </div>
  );
}
