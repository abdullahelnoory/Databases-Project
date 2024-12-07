import './styles.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <a href="/M" className="site-title">
        Manager
      </a>
      <ul className="nav-links">
        <li>
          <a href="/M/DriversM" className="nav-btn">Drivers</a>
        </li>
        <li>
          <a href="/M/TripsM" className="nav-btn">Trips</a>
        </li>
        <li>
          <a href="/M/Requests" className="nav-btn">Requests</a>
        </li>
      </ul>
    </nav>
  );
}
