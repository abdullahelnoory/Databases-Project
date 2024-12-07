import DGrid from './Components/driversgrid.js'
import Nav1 from './Components/navbar.js';

export default function DriversList() {


   return (
      <div >
         <header>
            <Nav1 />
         </header>
         <h1 style={{ margin: "1%" }}>Drivers</h1>
         <DGrid />

      </div>

   );
}