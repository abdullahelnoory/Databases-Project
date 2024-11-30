
import './styles.css'
import Grid from './griddriv.js'

import But from './senddata';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {useState} from 'react';
import HomeM from './HomeM.js';
import TripsM from './TripsM.js'
import Mreq from './Mreq.js';
import DriversList from './DriversList.js'

import Login from './Login.js'

function App() {
  return (
    
    <Router>
    <div className="App">
 
    <Switch>
      <Route exact path="/">
      <Login/>
      </Route> 


     <Route exact path="/M">
     <HomeM/>
      </Route>

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
    </Router>

  );
}

export default App;
