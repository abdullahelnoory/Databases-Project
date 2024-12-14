import React from "react";
import { useLocation } from "react-router-dom";
function Drivers() {
  const location = useLocation();
  return <div>
    
    {location.state.value}
    
    Hello from js
    
    </div>;
}

export default Drivers;
