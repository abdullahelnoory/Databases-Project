

export default  function navbar1()
{

  
  return (
    
 <nav className="Nav">
    <a href="/M" className="site Title" style={ {fontSize:"24px"}} >
    Manager
    </a>
    <ul>
        <li className ="active">
        <a href="/DriversM"> 
        Drivers
        </a>
        </li>
        <li className="active">
        <a href="/M/TripsM"> 
        Trips
        </a>
        </li>
        <li className="active">
        <a href="/M/Requests"> 
        comp3
        </a>
        </li>
    </ul>
  
 </nav>
 

  );
}

