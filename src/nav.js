export default function navbar1() {
  return (
    <nav className="Nav">
      <a href="/M" className="siteTitle" style={{ fontSize: "30px", marginLeft:'10px'}}>
        Manager
      </a>
      <ul>
        <li className="active">
          <a href="/DriversM">Drivers</a>
        </li>
        <li className="active">
          <a href="/M/TripsM">Trips</a>
        </li>
        <li className="active">
          <a href="/M/Requests">Requests</a>
        </li>
      </ul>
    </nav>
  );
}
