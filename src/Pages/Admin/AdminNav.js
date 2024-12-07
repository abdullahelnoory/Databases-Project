

export default function navbarA() {
    return (
      <nav className="NavA">
        <a href="/A" className="siteTitle" style={{ fontSize: "30px", marginLeft:'10px'}}>
          Admin
        </a>
        <ul>
          <li className="active">
            <a href="/StationsA">Stations</a>
          </li>
          <li className="active">
            <a href="/RequestsA">Requests</a>
          </li>
        </ul>
      </nav>
    );
  }