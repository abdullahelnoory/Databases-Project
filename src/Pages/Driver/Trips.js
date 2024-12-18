import "./Trips.css";
import { useState, useEffect } from "react";
import imagnotifi from "./notification.png";
import imgnonotifi from "./Nonotification.png";
import Popup from "reactjs-popup";
import { Link, NavLink } from "react-router-dom";
// import Dropdown from 'react-bootstrap/Dropdown';

const userssn = sessionStorage.getItem('ssn');

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

  let [privateDriver, setPrivateDriver] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const result = await fetch("http://localhost:6969/driver/get-private-status", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ d_ssn: userssn }),
        });
        const resultInjson = await result.json();
        setPrivateDriver(resultInjson.isPrivate);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);












  return (
    // <>

<div  className="mainPage">
      <Popup
        // onOpen={()=>setPopState({ ...popState, Seen: true })}
        open={popState.openPop}
        contentStyle={{ border: "0", background: "none" }}
        trigger={
          <img
          alt="Notification"
          role="button"
          className="imma"
          src={flagNotifiaction && !popState.Seen ? imagnotifi : imgnonotifi}
          // onClick={() => setPopState({ ...popState, openPop: !popState.openPop })}
          ></img>
        }
        onOpen={() => setPopState({ ...popState, openPop: true})}
        position="bottom center"
   
        // Close popup
        // Your extra function
        onClose={() => {
          setPopState({ ...popState, openPop: false, Seen: true }); // Close popup
        }} // Your extra function
      >
        {/* {popState.openPop ? ( */}
        <div className="containerr">
          <Link to="/Driver/Trips" className="items" onClick={() => OpenTrips()}>
            {" "}
            Trips
          </Link>
          {privateDriver ? <Link
            to="/Driver/PrivateTrips"
            className="item2"
            onClick={() => OpenPrivateTrips()}
          >
            {" "}
            Private{" "}
          </Link> : null}

        </div>
        {/* ) : null} */}
      </Popup>
      </div>
      /* <div className="parent"> */

      /* <img
        alt="Notification"
          role="button"
          className="imma"
          src={flagNotifiaction && !State.Seen ? imagnotifi : imgnonotifi}
          onClick={() => setState({ Seen: true, Req: !State.Req })}
        ></img> */

      /* </div> */

      /* {State.Req ? (
        <div className="containerr">
          <div className="items" onClick={()=>OpenTrips()}> Trips</div>
          <div className="item2"  onClick={()=>OpenPrivateTrips()}> Private </div>
        </div>
      ) : null} */




  // </> 
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
