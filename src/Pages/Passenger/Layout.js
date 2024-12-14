import React from 'react'
import NavBar from './NavBar'
import { Link,Outlet } from "react-router-dom";
const Layout=()=> {
  return (
    <div  style={{width:"100%",height:"100%"}}>
    <NavBar/> {/* Shared Navbar */}
    <main>
      <Outlet /> {/* This is where child routes will render */}
    </main>
    <footer>Footer</footer>
  </div>
  )
}

export default Layout
