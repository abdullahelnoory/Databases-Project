import React from "react";
import { useLocation } from "react-router-dom";
function Station() {
  const location = useLocation();
  return <div>{location.state.value}</div>;
}

export default Station;
