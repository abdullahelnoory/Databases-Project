

export default  function navbar1()
{

  
  return (
    
 <nav className="Nav">
    <a href="/" className="site Title" style={ {fontSize:"24px"}} >
    Manager
    </a>
    <ul>
        <li className ="active">
        <a href="/DriversM"> 
        Drivers
        </a>
        </li>
        <li className="active">
        <a href="/TripsM"> 
        Trips
        </a>
        </li>
        <li className="active">
        <a href="/Requests"> 
        comp3
        </a>
        </li>
    </ul>
  
 </nav>
 

  );
}

