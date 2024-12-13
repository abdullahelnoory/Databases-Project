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
function NavBar() {
  const location = useLocation();
  return (
    <>
      <nav className="nav_Driver">
        <Link className="mainPage" to="/">
          Home
        </Link>
        <ul>
          {location.pathname === "/Driver/Trips" ? (
            <li>
              <LostItems className="req" />
            </li>
          ) : null}

          <li>
            <Trips className="req" flagNotifiaction={true} />
          </li>
          <li>
            <Attend className="req" />
          </li>
          <li>
            <Resign className="req" />
          </li>
          <li>
            <ReqStatus className="req" />
          </li>
          <li>
            <ReqDayoff className="req" />
          </li>
          <li>
            {" "}
            <NavLink to="/Driver/Profile">Profile</NavLink>
          </li>
          <li>
            {" "}
            <NavLink to="/Driver/LogOut">LogOut</NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
