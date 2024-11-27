

export default  function navbar1()
{

  
  return (
    
 <nav className="Nav">
    <a href="/" className="site Title" style={ {fontSize:"24px"}} >
    Manager
    </a>
    <ul>
        <li className ="active">
        <a href="/comp1"> 
        Drivers
        </a>
        </li>
        <li className="active">
        <a href="/comp2"> 
        Trips
        </a>
        </li>
        <li className="active">
        <a href="/comp3"> 
        comp3
        </a>
        </li>
    </ul>
  
 </nav>
 

  );
}

