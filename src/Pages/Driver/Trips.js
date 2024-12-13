import "./Trips.css";
import { useState, useEffect } from "react";
import imagnotifi from "./notification.png";
import imgnonotifi from "./Nonotification.png";
import Popup from "reactjs-popup";
import { Link, NavLink } from "react-router-dom";
// import Dropdown from 'react-bootstrap/Dropdown';
export default function Trips({ flagNotifiaction }) {
  let [popState, setPopState] = useState({
    openPop: false,
    Seen: false,
  });

  function OpenTrips() {
    setPopState({ ...popState, Seen: true, openPop: false });
  }
  function OpenPrivateTrips() {
    setPopState({ ...popState, Seen: true, openPop: false });
  }
  // const [PopupOpen, setPopupOpen] = useState(false);

  return (
    <>
      <img
        alt="Notification"
        role="button"
        className="imma"
        src={flagNotifiaction && !popState.Seen ? imagnotifi : imgnonotifi}
        onClick={() => setPopState({ ...popState, openPop: !popState.openPop })}
      ></img>

      <Popup
        // onOpen={()=>setPopState({ ...popState, Seen: true })}
        open={popState.openPop}
        contentStyle={{ border: "0", background: "none" }}
        trigger={
          <img

          ></img>
        }
        position="bottom center"
        // Close popup
        // Your extra function
        onClose={() => {
          setPopState({ ...popState, openPop: false, Seen: true }); // Close popup
        }} // Your extra function
      >
        {/* {popState.openPop ? ( */}
        <div className="containerr">
          <Link to="/Trips" className="items" onClick={() => OpenTrips()}>
            {" "}
            Trips
          </Link>
          <Link
            to="/PrivateTrips"
            className="item2"
            onClick={() => OpenPrivateTrips()}
          >
            {" "}
            Private{" "}
          </Link>
        </div>
        {/* ) : null} */}
      </Popup>
      {/* <div className="parent"> */}

      {/* <img
        alt="Notification"
          role="button"
          className="imma"
          src={flagNotifiaction && !State.Seen ? imagnotifi : imgnonotifi}
          onClick={() => setState({ Seen: true, Req: !State.Req })}
        ></img> */}

      {/* </div> */}

      {/* {State.Req ? (
        <div className="containerr">
          <div className="items" onClick={()=>OpenTrips()}> Trips</div>
          <div className="item2"  onClick={()=>OpenPrivateTrips()}> Private </div>
        </div>
      ) : null} */}



      
    </>
  );
}

{
  /* <div className="items"> <button className="bbutton">Trips</button> </div>
<div className="item2"> <button className="bbutton">Private</button> </div> */
}

{
  /* <Dropdown>
<Dropdown.Toggle variant="success" id="dropdown-basic">
Dropdown Button
</Dropdown.Toggle>

<Dropdown.Menu>
<Dropdown.Item href="#/action-1">Action</Dropdown.Item>
<Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
<Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
</Dropdown.Menu>
</Dropdown> */
}
