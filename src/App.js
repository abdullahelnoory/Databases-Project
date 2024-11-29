import Nav1 from './nav.js';
import './styles.css'
import Grid from './griddriv.js'

import But from './senddata';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {useState} from 'react';
import HomeM from './HomeM.js';
import DriversList from './DriversList.js'


function App() {
  return (
    <Router>
    <div className="App">
   <header>
    <Nav1/>
   </header>
    <h1 className="Mname">
      Mname
    </h1>
    <Switch>
      <Route exact path="/">
      <HomeM/>
      </Route>
      <Route exact path="/DriversM">
      <DriversList/>
      </Route>
    </Switch>
  
  <But/>
    </div>
    </Router>

  );
}

export default App;
