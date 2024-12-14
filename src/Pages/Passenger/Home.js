import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { Link } from "react-router";
import { IconContext } from "react-icons";
import { VscAccount, VscChromeClose } from "react-icons/vsc";
import "./Home.css"















function Home() {
  let { openState, setOpenState } = useState(false);
//   const showIcons = () => setOpenState(!openState);

  return (
    <div className="Home">
    Home
    </div>
  );
}

export default Home;










































{/* <IconContext.Provider value={{ color: "undefined" }}>
<div className="navbar">
  <FaIcons.FaBars onClick={() => setOpenState(!openState)}></FaIcons.FaBars>
</div>

{openState ? (
  <div style={{ width: "100px", backgroundColor: "red" }}>
    <VscChromeClose></VscChromeClose>
  </div>
) : null}
</IconContext.Provider> */}