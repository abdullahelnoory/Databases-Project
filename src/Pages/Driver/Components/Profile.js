import React, { useState, useEffect } from 'react';
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const userssn = sessionStorage.getItem('ssn');

  useEffect(() => {
    // Fetch user profile data from backend
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("http://localhost:6969/driver/profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ssn: userssn }),  // Replace with the actual SSN or user ID
        });
        
        const data = await response.json();
        
        if (data) {
          setUser(data); // Assuming the response contains user info
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div id="main-profile">
      {user ? (
        <h1 id="welcome-message">Welcome, {user.data.fname} {user.data.lname}!</h1>
      ) : (
        <h1 id="loading-message">Loading...</h1>
      )}
    </div>
  );
}

export default Profile;
