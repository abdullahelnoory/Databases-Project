import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(true);
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
        setIsVerified(false);
      }
    };

    checkVerification();
  }, [userssn]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    sessionStorage.clear();
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

      <Link className="site-title" to="/manager">
        Manager
      </Link>
      <ul className="nav-links">
        <li>

          <Link onClick={(e) => {
            if (!isVerified) {
              e.preventDefault();
            }
          }} className="nav-btn" to="/manager/drivers" style={{ pointerEvents: isVerified ? 'auto' : 'none', opacity: isVerified ? 1 : 0.5 }}>
            Drivers
          </Link>

        </li>
        <li>
          <Link onClick={(e) => {
            if (!isVerified) {
              e.preventDefault();
            }
          }} className="nav-btn" to="/manager/trips" style={{ pointerEvents: isVerified ? 'auto' : 'none', opacity: isVerified ? 1 : 0.5 }}>
            Trips
          </Link>
        </li>
        <li>
          <Link onClick={(e) => {
            if (!isVerified) {
              e.preventDefault();
            }
          }} className="nav-btn" to="/manager/requests" style={{ pointerEvents: isVerified ? 'auto' : 'none', opacity: isVerified ? 1 : 0.5 }}>
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
export default Navbar;
