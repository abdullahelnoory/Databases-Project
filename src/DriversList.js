import DGrid from './griddriv.js'
import Nav1 from './nav.js';
import { useHistory } from 'react-router-dom';
export default function DriversList() {
   const history = useHistory();

   return (
      <div >
         <header>
            <Nav1 />
         </header>
         <h1 style={{ margin: "1%" }}>Drivers</h1>
         <div className="List">
            <DGrid />
            <button className='button' onClick={() => history.push('/M/DriversM/addDriver')} >Add Driver </button>
            <button className='button'>
               Update Salary
            </button>
            <button className='button'>
               Remove Driver
            </button>
         </div>
      </div>

   );
}