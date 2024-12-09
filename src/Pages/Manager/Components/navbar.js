import React, { useState, useEffect } from 'react';
import './styles.css';

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(true); // Default to true assuming the manager is verified
  const userssn = sessionStorage.getItem('ssn');
  
  useEffect(() => {
    const checkVerification = async () => {
      try {
        const response = await fetch('http://localhost:6969/manager/check-verified', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ m_ssn: userssn }), 
        });

        const data = await response.json();

        if (data.success && data.data.isVerified !== undefined) {
          sessionStorage.setItem('verified', data.data.isVerified);
          setIsVerified(data.data.isVerified);
        } else {
          setIsVerified(false);
        }
      } catch (error) {
        console.error("Error checking manager verification:", error);
        setIsVerified(false); // Set to false if there's an error
      }
    };

    checkVerification();
  }, [userssn]);

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
          <a
            href="/manager/drivers"
            className="nav-btn"
            onClick={(e) => {
              if (!isVerified) {
                e.preventDefault(); // Prevent navigation if not verified
              }
            }}
            style={{ pointerEvents: isVerified ? 'auto' : 'none', opacity: isVerified ? 1 : 0.5 }}
          >
            Drivers
          </a>
        </li>
        <li>
          <a
            href="/manager/trips"
            className="nav-btn"
            onClick={(e) => {
              if (!isVerified) {
                e.preventDefault(); // Prevent navigation if not verified
              }
            }}
            style={{ pointerEvents: isVerified ? 'auto' : 'none', opacity: isVerified ? 1 : 0.5 }}
          >
            Trips
          </a>
        </li>
        <li>
          <a
            href="/manager/requests"
            className="nav-btn"
            onClick={(e) => {
              if (!isVerified) {
                e.preventDefault(); // Prevent navigation if not verified
              }
            }}
            style={{ pointerEvents: isVerified ? 'auto' : 'none', opacity: isVerified ? 1 : 0.5 }}
          >
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
