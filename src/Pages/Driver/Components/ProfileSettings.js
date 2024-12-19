import React, { useState, useEffect } from "react";
import "./ProfileSettings.css";

function ProfileSettings() {
  const [profileData, setProfileData] = useState({
    fname: "",
    mname: "",
    lname: "",
    email: "",
    is_private: false,
    shift: "",
    salary: "",
    s_id: "",
    m_ssn: "",
  });

  const [initialProfileData, setInitialProfileData] = useState({});
  const [manager, setManager] = useState("");
  const [station, setStation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [profileLoaded, setProfileLoaded] = useState(false);

  const fetchProfileData = async () => {
    const ssn = sessionStorage.getItem("ssn");
    if (!ssn) {
      alert("No SSN found in session storage");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:6969/driver/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ssn }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile data");
      }

      const result = await response.json();
      const profile = {
        ssn: sessionStorage.getItem("ssn"),
        fname: result.data.fname,
        mname: result.data.mname,
        lname: result.data.lname,
        email: result.data.email,
        is_private: result.data.is_private,
        shift: result.data.shift,
        salary: result.data.salary,
        s_id: result.data.s_id,
        m_ssn: result.data.m_ssn,
      };

      setProfileData(profile);
      setInitialProfileData(profile); // Store the initial profile data

      if (result.manager) {
        setManager(result.manager);
      }

      if (result.station) {
        setStation(result.station);
      }

      setProfileLoaded(true);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Failed to load profile data");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleTogglePrivate = () => {
    setProfileData({
      ...profileData,
      is_private: !profileData.is_private,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Reset the error and success messages before making the request
    setError("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:6969/driver/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ssn: sessionStorage.getItem("ssn"),
          fname: profileData.fname,
          mname: profileData.mname,
          lname: profileData.lname,
          email: profileData.email,
          is_private: profileData.is_private,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Profile updated successfully!");
      } else {
        if (result.message === "Email already exists.") {
          setError("The email you entered already exists.");
        } else {
          setError(result.message || "Failed to update profile");
        }
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("An unexpected error occurred while updating the profile.");
    }
  };

  const isProfileChanged = JSON.stringify(profileData) !== JSON.stringify(initialProfileData);

  return (
    <div className="container-set">
      {loading ? (
        <div>Loading...</div>
      ) : !profileLoaded ? (
        <div className="profile-card-set">
          <div className="profile-settings-set">
            <h2 className="section-title-set">Error loading profile</h2>
            <p>{error}</p>
          </div>
        </div>
      ) : (
        <div className="profile-card-set">
          <div className="profile-sidebar-set">
            <img
              className="profile-image-set"
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              alt="Profile-Image"
            />
            <h2 className="profile-name-set">
              {profileData.fname} {profileData.lname}
            </h2>
            <p className="profile-email-set">{profileData.email}</p>
          </div>

          <div className="profile-settings-set">
            <h2 className="section-title-set">Profile Settings</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group-set">
                <div className="form-input-set">
                  <label htmlFor="fname" className="set">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    value={profileData.fname}
                    onChange={handleChange}
                    className="set"
                  />
                </div>
                <div className="form-input-set">
                  <label htmlFor="mname" className="set">
                    Middle Name
                  </label>
                  <input
                    type="text"
                    id="mname"
                    name="mname"
                    value={profileData.mname}
                    onChange={handleChange}
                    className="set"
                  />
                </div>
                <div className="form-input-set">
                  <label htmlFor="lname" className="set">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lname"
                    name="lname"
                    value={profileData.lname}
                    onChange={handleChange}
                    className="set"
                  />
                </div>
              </div>

              <div className="form-group-set">
                <div className="form-input-set">
                  <label htmlFor="email" className="set">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                    className="set"
                  />
                </div>
              </div>

              <div className="form-group-set">
                <div className="form-input-set">
                  <label htmlFor="is_private" className="set">
                    Private Profile
                  </label>
                  <input
                    type="checkbox"
                    id="is_private"
                    name="is_private"
                    checked={profileData.is_private}
                    onChange={handleTogglePrivate}
                    className="set"
                  />
                </div>
              </div>

              <div className="form-group-set">
                <div className="form-input-set">
                  <label htmlFor="manager" className="set">
                    Manager
                  </label>
                  <input
                    type="text"
                    id="manager"
                    name="manager"
                    value={manager}
                    className="set"
                    disabled
                  />
                </div>
                <div className="form-input-set">
                  <label htmlFor="station" className="set">
                    Station
                  </label>
                  <input
                    type="text"
                    id="station"
                    name="station"
                    value={station}
                    className="set"
                    disabled
                  />
                </div>
                <div className="form-input-set">
                  <label htmlFor="shift" className="set">
                    Shift
                  </label>
                  <input
                    type="text"
                    id="shift"
                    name="shift"
                    value={profileData.shift}
                    className="set"
                    disabled
                  />
                </div>
                <div className="form-input-set">
                  <label htmlFor="salary" className="set">
                    Salary
                  </label>
                  <input
                    type="text"
                    id="salary"
                    name="salary"
                    value={profileData.salary}
                    className="set"
                    disabled
                  />
                </div>
              </div>

              <div className="mt-5 text-center">
                <button
                  className="btn btn-primary profile-button-set"
                  type="submit"
                  disabled={!isProfileChanged} 
                >
                  Save Profile
                </button>
              </div>
              {error.length > 0 && <p className="error-message">{error}</p>}
              {successMessage.length > 0 && (
                <p className="success-message">{successMessage}</p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileSettings;
