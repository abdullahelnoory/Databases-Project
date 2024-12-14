import React from "react";
// import {Link} from 'react-router'
import { Link, Navigate, NavLink, useLocation } from "react-router-dom";
import "./NavBar.css";
import ReqDayoff from "./ReqDayoff";
import ReqStatus from "./ReqStatus";
import Attend from "./Attend";
import Resign from "./Resign";
import Trips from "./Trips";
import LostItems from "./LostItems";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  let [openSettings, setOpenSettings] = useState(false);
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
            <NavLink
              to="/"
              onClick={() => {
                localStorage.removeItem("authToken");
                sessionStorage.clear();
              }}
            >
              LogOut
            </NavLink>
          </li>
          <li className="sidepop">
            <input id="toggleChecker" type="checkbox" />
            <label id="togglerLable" for="toggleChecker">
              <div
                class="checkboxtoggler"
                onClick={() => setOpenSettings(!openSettings)}
              >
                <div class="line-1"></div>
                <div class="line-2"></div>
                <div class="line-3"></div>
              </div>
            </label>
          </li>
        </ul>
        {openSettings?    <div class="card-nav">
              <ul
                class="list"
                    style={{'--color':"#5353ff",'--hover-storke':"#fff",' --hover-color':"#fff"}}
              >
                <li class="element" style={{'--color':"#5353ff"}}>
                  <label for="settings">
                    <input type="radio" id="settings" name="filed" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#7e8590"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-settings"
                    >
                      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    Settings
                  </label>
                  <div class="separator"></div>
                </li>
                <li class="element delete" style={{'--color':"#8e2a2a"}}>
                  <label for="delete">
                    <input type="radio" id="delete" name="filed" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#7e8590"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-trash-2"
                    >
                      <path d="M3 6h18"></path>
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                      <line x1="10" x2="10" y1="11" y2="17"></line>
                      <line x1="14" x2="14" y1="11" y2="17"></line>
                    </svg>
                    Delete
                  </label>
                </li>
                <div class="separator"></div>
                <li
                  className="element"
                  style={{'--color':"rgb(56, 45, 71, 0.836)",'--hover-storke':"#bd89ff",'--hover-color':"#bd89ff"}}
                >
                  <label for="teamaccess"               onClick={() => {
                localStorage.removeItem("authToken");
                sessionStorage.clear();
                navigate("/");
              }}>
                    <input type="radio" id="teamaccess" name="filed" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#7e8590"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="lucide lucide-users-round"
                    >
                      <path
                        className="group-focus:fill-white"
                        fill="#5353ff"
                        d="M17.2929 14.2929C16.9024 14.6834 16.9024 15.3166 17.2929 15.7071C17.6834 16.0976 18.3166 16.0976 18.7071 15.7071L21.6201 12.7941C21.6351 12.7791 21.6497 12.7637 21.6637 12.748C21.87 12.5648 22 12.2976 22 12C22 11.7024 21.87 11.4352 21.6637 11.252C21.6497 11.2363 21.6351 11.2209 21.6201 11.2059L18.7071 8.29289C18.3166 7.90237 17.6834 7.90237 17.2929 8.29289C16.9024 8.68342 16.9024 9.31658 17.2929 9.70711L18.5858 11H13C12.4477 11 12 11.4477 12 12C12 12.5523 12.4477 13 13 13H18.5858L17.2929 14.2929Z"
                      ></path>
                      <path
                        className="group-focus:fill-white"
                        d="M5 2C3.34315 2 2 3.34315 2 5V19C2 20.6569 3.34315 22 5 22H14.5C15.8807 22 17 20.8807 17 19.5V16.7326C16.8519 16.647 16.7125 16.5409 16.5858 16.4142C15.9314 15.7598 15.8253 14.7649 16.2674 14H13C11.8954 14 11 13.1046 11 12C11 10.8954 11.8954 10 13 10H16.2674C15.8253 9.23514 15.9314 8.24015 16.5858 7.58579C16.7125 7.4591 16.8519 7.35296 17 7.26738V4.5C17 3.11929 15.8807 2 14.5 2H5Z"
                      ></path>
                    </svg>
                    Log Out
                  </label>
                </li>
              </ul>
            </div>:null}
      </nav>
     
    </>
  );
}

export default NavBar;
