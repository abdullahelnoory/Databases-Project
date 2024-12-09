import React, { useState, useEffect } from 'react';
import Navbar from './Components/navbar.js';

export default function Manager() {
  const [isVerified, setIsVerified] = useState(false); // State to hold verification status
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

  return (
    <div>
      <header>
        <Navbar />
      </header>
      <h1 id="manager-greeting" className="Mname" style={{ margin: '15px' }}>
        Hello User {userssn}
      </h1>
      {!isVerified && (
        <p id="verification-message" style={{ color: 'red', fontWeight: 'bold', margin: '15px' }}>
          You are not verified yet. Please wait for admin verification.
        </p>
      )}
    </div>
  );
}
