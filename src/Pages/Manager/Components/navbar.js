import React, { useState } from 'react';
import './styles.css';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.clear();
    alert('You have been logged out successfully!');
    window.location.href = '/';
  };

  const handleChangePassword = () => {
    window.location.href = '/change-password';
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <a href="/M" className="site-title">
        Manager
      </a>
      <ul className="nav-links">
        <li>
          <a href="/manager/drivers" className="nav-btn">Drivers</a>
        </li>
        <li>
          <a href="/manager/trips" className="nav-btn">Trips</a>
        </li>
        <li>
          <a href="/manager/requests" className="nav-btn">Requests</a>
        </li>
        <li>
          <div className="dropdown-container">
            <button onClick={toggleDropdown} className="dropdown-btn">
              Account ▼
            </button>
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <button onClick={handleChangePassword} className="dropdown-item">
                    Change Password
                  </button>
                </li>
                <li>
                  <button onClick={handleLogout} className="dropdown-item">
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </li>
      </ul>
    </nav>
  );
}
