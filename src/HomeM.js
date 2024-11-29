
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import DriversList from './DriversList.js'

import TripsM from './TripsM.js'
import Mreq from './Mreq.js';
import Nav1 from './nav.js';
export default function manager()
{

    return(
        
        <div> 
     
              
              

        <header>
        <Nav1/>
        </header>
        <h1 className="Mname">
        Mname
        </h1>  

        <Mreq/>
        <Switch>
                 <Route exact path="/DriversM">
                  <DriversList/>
                  </Route>

                  <Route exact path="/M/TripsM">
                     <TripsM/>
                  </Route>

                   <Route exact path="/M/Requests">
                     <Mreq/>
                   </Route>
                 </Switch>
        </div>
        

    );

}