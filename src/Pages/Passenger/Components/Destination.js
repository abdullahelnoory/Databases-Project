import React from 'react'
import {useLocation} from 'react-router-dom';
function Destination() {
    const location = useLocation();
    return (
      <div>
  
  {location.state.Destination}
  
      </div>
    )
}

export default Destination
