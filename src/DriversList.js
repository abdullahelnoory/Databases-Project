import DGrid from './griddriv.js'
import Nav1 from './nav.js';

export default function DriversList() {
 

   return (
      <div >
         <header>
            <Nav1 />
         </header>
         <h1 style={{ margin: "1%" }}>Drivers</h1>
         <div className="List">
            <DGrid />
          
         </div>
      </div>

   );
}