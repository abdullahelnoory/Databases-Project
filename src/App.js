import './styles.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import AdminRequests from './Pages/Admin/Request.js';
import CreateAdmin from './Pages/Admin/Create_Admin.js';
import NavBar1 from './Pages/Manager/Components/navbar.js';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route path="/signup" element={<Signup />} />

          <Route element={<PrivateRoute requiredRole="Admin" />}>
            <Route path="/admin" element={<AdminHome />} />
            <Route path="/admin/stations/add" element={<AdminAddStation />} />
            <Route path="/admin/stations" element={<AdminStations />} />
            <Route path="/admin/requests" element={<AdminRequests />} />
            <Route path="/admin/create-admin" element={<CreateAdmin />} />
          </Route>

          <Route element={<PrivateRoute requiredRole="Manager" />}>
            <Route path="manager" element={<ManagerHome />} />
            <Route path="manager/drivers/add" element={<ManagerAddDriver />} />
            <Route path="manager/trips/add" element={<ManagerAddTrip />} />
            <Route path="manager/drivers" element={<ManagerDrivers />} />
            <Route path="manager/trips" element={<ManagerTrips />} />
            <Route path="manager/requests" element={<ManagerRequests />} />
          </Route>

          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
