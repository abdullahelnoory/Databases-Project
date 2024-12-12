import React, { useState } from 'react';
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
          <a href="/admin/stations" className="nav-btn">
            Stations
          </a>
        </li>
        <li>
          <a href="/admin/requests" className="nav-btn">
            Requests
          </a>
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
                  <a href="/admin/create-admin" className="dropdown-item" id="create-admin-link">
                    Create Admin
                  </a>
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
