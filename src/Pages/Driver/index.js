import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Driver from "./Driver";
import reportWebVitals from "./reportWebVitals";
import AllTrips from "./AllTrips";
import PrivateTrips from "./PrivateTrips";
import Home from "./Home";
import { Navbar } from "react-bootstrap";
import NavBar from "./NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./Components/Profile";
import LogOut from "./Components/LogOut";
import Layout from "./Layout";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>

    <BrowserRouter>

      <Routes >
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Profile" element={<Profile />} />
          <Route path="LogOut" element={<LogOut />} />
          <Route path="Trips" element={<AllTrips />} />
          <Route path="PrivateTrips" element={<PrivateTrips />} />


          
          {/* <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} / */}
        </Route>
      </Routes>
      {/* <Home/> */}
    </BrowserRouter>


    {/* <AllTrips /> */}
    {/* <Driver/> */}
    {/* <PrivateTrips/> */}

    {/* <NavBar/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
