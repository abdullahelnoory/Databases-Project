import './styles.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import HomeM from './Pages/Manager/Home.js';
import TripsM from './Pages/Manager/Trips.js';
import Mreq from './Pages/Manager/Request.js';
import DriversList from './Pages/Manager/Drivers.js';
import Signup from './Pages/Signup.js';
import Login from './Pages/Login.js';
import AddTrip from './Pages/Manager/Add_Trip.js';
import HomeA from './Pages/Admin/AHome.js';
import AddStation from './Pages/Admin/AddStation.js';
import StationA from './StationsA.js';
import Adddriver from './Pages/Manager/Add_Driver.js';
import PrivateRoute from './PrivateRoute'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>

          <Route exact path="/Signup">
            <Signup />
          </Route>

          <PrivateRoute exact path="/A" component={HomeA} requiredRole="Admin" />
          <PrivateRoute exact path="/AddStation" component={AddStation} requiredRole="Admin" />
          <PrivateRoute exact path="/StationsA" component={StationA} requiredRole="Admin" />

          <PrivateRoute exact path="/M" component={HomeM} requiredRole="Manager" />
          <PrivateRoute exact path="/M/DriversM/addDriver" component={Adddriver} requiredRole="Manager" />
          <PrivateRoute exact path="/AddTrip" component={AddTrip} requiredRole="Manager" />
          <PrivateRoute exact path="/M/DriversM" component={DriversList} requiredRole="Manager" />
          <PrivateRoute exact path="/M/TripsM" component={TripsM} requiredRole="Manager" />
          <PrivateRoute exact path="/M/Requests" component={Mreq} requiredRole="Manager" />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
