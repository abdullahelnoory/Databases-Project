import React, { useState, useEffect } from 'react';

export default function Manager() {
  const [isVerified, setIsVerified] = useState(false);
  const [managerProfile, setManagerProfile] = useState(null); // State for profile data
  const [loading, setLoading] = useState(true); // State to track loading status
  const userssn = sessionStorage.getItem('ssn');

  useEffect(() => {
    const fetchManagerProfile = async () => {
      try {
        const response = await fetch('http://localhost:6969/manager/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ssn: userssn }),
        });

        const data = await response.json();

        if (data.success) {
          setManagerProfile(data.data); // Set manager profile data
          setIsVerified(data.data.verified_by ? true : false); // Set verification status
        } else {
          setManagerProfile(null); // Handle case where manager isn't found
          setIsVerified(false);
        }
      } catch (error) {
        console.error("Error fetching manager profile:", error);
        setManagerProfile(null);
        setIsVerified(false);
      } finally {
        setLoading(false);
      }
    };

    fetchManagerProfile();
  }, [userssn]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 id="manager-greeting" className="Mname" style={{ margin: '15px' }}>
            Hello {managerProfile ? `${managerProfile.fname} ${managerProfile.lname}` : 'User'}
          </h1>
          {managerProfile && !isVerified && (
            <p
              id="verification-message"
              style={{ color: 'red', fontWeight: 'bold', margin: '15px' }}
            >
              You are not verified yet. Please wait for admin verification.
            </p>
          )}
          {managerProfile && isVerified && (
            <p
              id="verification-message"
              style={{ color: 'green', fontWeight: 'bold', margin: '15px' }}
            >
              Your account has been verified by {managerProfile.admin ? managerProfile.admin : 'an admin'}.
            </p>
          )}
        </>
      )}
    </div>
  );
}
