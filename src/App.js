import './styles.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ManagerHome from './Pages/Manager/Home.js';
import ManagerTrips from './Pages/Manager/Trips.js';
import ManagerRequests from './Pages/Manager/Request.js';
import ManagerDrivers from './Pages/Manager/Drivers.js';
import Signup from './Pages/Signup.js';
import Login from './Pages/Login.js';
import ManagerAddTrip from './Pages/Manager/Add_Trip.js';
import AdminHome from './Pages/Admin/Home.js';
import AdminAddStation from './Pages/Admin/Add_Station.js';
import AdminStations from './Pages/Admin/Stations.js';
import ManagerAddDriver from './Pages/Manager/Add_Driver.js';
import PrivateRoute from './PrivateRoute';
import ChangePassword from './Pages/ChangePassword';
import AdminRequests from './Pages/Admin/Reqestsgrid.js';
import CreateAdmin from './Pages/Admin/Create_Admin.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>

          <Route exact path="/signup">
            <Signup />
          </Route>

          <PrivateRoute exact path="/admin" component={AdminHome} requiredRole="Admin" />
          <PrivateRoute exact path="/admin/stations/add" component={AdminAddStation} requiredRole="Admin" />
          <PrivateRoute exact path="/admin/stations" component={AdminStations} requiredRole="Admin" />
          <PrivateRoute exact path="/admin/requests" component={AdminRequests} requiredRole="Admin" />
          <PrivateRoute exact path="/admin/create-admin" component={CreateAdmin} requiredRole="Admin" /> {/* New Route */}
          
          <PrivateRoute exact path="/manager" component={ManagerHome} requiredRole="Manager" />
          <PrivateRoute exact path="/manager/drivers/add" component={ManagerAddDriver} requiredRole="Manager" />
          <PrivateRoute exact path="/manager/trips/add" component={ManagerAddTrip} requiredRole="Manager" />
          <PrivateRoute exact path="/manager/drivers" component={ManagerDrivers} requiredRole="Manager" />
          <PrivateRoute exact path="/manager/trips" component={ManagerTrips} requiredRole="Manager" />
          <PrivateRoute exact path="/manager/requests" component={ManagerRequests} requiredRole="Manager" />

          <Route exact path="/change-password">
            <ChangePassword />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
