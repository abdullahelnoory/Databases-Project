import Nav1 from './nav.js';
import './styles.css'
import Grid from './griddriv.js'

import But from './senddata';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {useState} from 'react';
import HomeM from './HomeM.js';

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




     </Switch>
  
    </div>
    </Router>

  );
}

export default App;
