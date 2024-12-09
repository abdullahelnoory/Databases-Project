import Mreq from './Components/requestsgrid.js';  // Import the Mreq component
import Nav1 from './Components/navbar'; // Import the Nav1 component

export default function MreqList() {
  return (
    <div>
      <header>
        <Nav1 /> 
      </header>
      <h1 style={{ margin: "1%" , textAlign: "center"}}>Requests</h1> 
      <Mreq />
    </div>
  );
}
