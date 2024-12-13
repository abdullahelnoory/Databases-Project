import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./styles.css";

export default function NavbarA() {
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

  const handleCreateAdmin = () => {
    window.location.href = 'admin/create-admin';
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <a href="/admin" className="site-title">
        Admin
      </a>
      <ul className="nav-links">
        <li>
          <Link className="nav-btn" to="/admin/stations">
            Stations
          </Link>
        </li>
        <li>
          <Link className="nav-btn" to="/admin/requests">
            Requests
          </Link>
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
                  <Link className="dropdown-item" id="create-admin-link" to="/admin/create-admin">
                    Create Admin
                  </Link>
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
};
