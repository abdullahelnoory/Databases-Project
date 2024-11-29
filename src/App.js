import Nav1 from './nav.js';
import './styles.css'
import Grid from './griddriv.js'

import But from './senddata';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {useState} from 'react';
import HomeM from './HomeM.js';
import DriversList from './DriversList.js'
import Login from './Login.js'
import TripsM from './TripsM.js'
import Mreq from './Mreq.js';
function App() {
  return (
    
    <Router>
    <div className="App">
 
    <Switch>
      <Route exact path="/">
      <Login/>
       <Switch>
         <Route exact path="/M">
         <HomeM/>
          
         <Route exact path="/DriversM">
         <DriversList/>
         </Route>

         <Route exact path="/TripsM">
         <TripsM/>
         </Route>

         <Route exact path="/TripsM">
         <Mreq/>
         </Route>

         </Route>
        
       </Switch>
      </Route>
     
    </Switch>
  
  
    </div>
    </Router>

  );
}

export default App;
