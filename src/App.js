import './styles.css'
import But from './senddata';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import HomeM from './Pages/Manager/Home.js';
import TripsM from './Pages/Manager/Trips.js'
import Mreq from './Pages/Manager/Request.js';
import DriversList from './Pages/Manager/Drivers.js'
import Signup from './Pages/Signup.js'
import Login from './Pages/Login.js'
import AddTrip from './Pages/Manager/Add_Trip.js'
import HomeA from './Pages/Admin/AHome.js'
import AddStation from './Pages/Admin/AddStation.js'
import StationA from './StationsA.js'
import Adddriver from './Pages/Manager/Add_Driver.js'

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

               <Route exact path="/A">
                  <HomeA />
               </Route>

               <Route exact path="/AddStation">
                  <AddStation />
               </Route>

               <Route exact path="/StationsA">
                  <StationA />
               </Route>

               <Route exact path="/M/DriversM/addDriver">

                  <Adddriver />
               </Route>








               <Route exact path="/M">
                  <HomeM />
               </Route>

               <Route exact path="/AddTrip">
                  <AddTrip />
               </Route>


               <Route exact path="/M/DriversM">
                  <DriversList />
               </Route>

               <Route exact path="/M/TripsM">
                  <TripsM />
               </Route>


               <Route exact path="/M/Requests">
                  <Mreq />
               </Route>

            </Switch>

         </div>
      </Router>

   );
}

export default App;
