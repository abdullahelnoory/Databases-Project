import React from "react";
// import {Link} from 'react-router'
import { Link, NavLink, useLocation } from "react-router-dom";
import "./NavBar.css";
import ReqDayoff from "./ReqDayoff";
import ReqStatus from "./ReqStatus";
import Attend from "./Attend";
import Resign from "./Resign";
import Trips from "./Trips";
import LostItems from "./LostItems";
import MyTrips from "./MyTrips";
function NavBar() {
  const location = useLocation();
  return (
    <>
      <nav>
        <Link className="mainPage" to="/">
          Home
        </Link>
        <ul>
          {/* {location.pathname === "/Trips" ? (
            <li>
              <LostItems className="req" />
            </li>
          ) : null} */}

          {/* <li>
            <Trips className="req" flagNotifiaction={true} />
          </li> */}
          <li>
          <NavLink  className="req"   to="/Passenger/MyTrips">My Trips</NavLink>
          </li>
          <li>
            <ReqStatus className="req" />
          </li>
          <li>
          <NavLink  className="req"   to="/Passenger/PrivateTrips">Private Trips</NavLink>
          </li>

          <li>
          <NavLink  className="req" to="/Passenger/RequestTrips">Trips</NavLink>
          </li>


          <li>
            {" "}
            <NavLink  className="req" to="/Passenger/Profile">Profile</NavLink>
          </li>
          <li>
            {" "}
            <NavLink   className="req"to="/">LogOut</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
