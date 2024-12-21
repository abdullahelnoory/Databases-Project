import React from "react";
import { useLocation } from "react-router-dom";
import "./Profile.css";
import { useState, useEffect } from "react";
function Drivers() {
  const location = useLocation();
  let [profileState, setProfileState] = useState({
    email: "",
    fname: "",
    station_name:"",
    rate:null
  });
  const userssn =location.state.value;
  useEffect(() => {
    (async () => {
      try {
        const result = await fetch(
          "http://localhost:6969/driver/get-profileData",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ d_ssn: userssn}),
          }
        );
        const resultInjson = await result.json();
        console.log(resultInjson);
        setProfileState(resultInjson.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div >
      
    <div class="main-profile">
    <div class="profile-card-set" style={{justifyContent:"center"}}>
      <div class="myprofile-sidebar-set">
        <img
          class="profile-image-set"
          src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
          alt="Profile-Image"
        />
        <h2 class="profile-name-set">{profileState.fname}</h2>
        <p class="profile-email-set">{profileState.email}</p>
      </div>
      </div>
      <div class="profile-card-set">
        <div class="profile-settings-set">
          <h2 class="section-title-set"> My Profile </h2>
          <form>
            <div class="form-group-set">
              <div class="form-input-set">
                <label for="first-name" class="set">
                  fname
                </label>
                {/* <h3 id="first-name" class="profile-name-set">
                  {profileState.fname}
                </h3> */}
                             <input
                  type="text"
                  id="lname"
                  class="set"
                  value={profileState.fname}
                  disabled
                />
              </div>

            </div>
            <div class="form-group-set">

              <div class="form-input-set">
                <label for="email" class="set">
                  Email
                </label>
                <input
                  type="text"
                  id="email"
                  class="set"
                  value={profileState.email}
                  disabled
                />
              </div>
            </div>

              <div class="form-group-set" >

              <div class="form-input-set">
                <label for="rate" class="set">
                   rate
                </label>
                <input
                  type="text"
                  id="rate"
                  class="set"
                  value={profileState.rate}
                  disabled
                />
              </div>


              <div class="form-input-set">
                <label for="station_name" class="set">
                Station Name
                </label>
                <input
                  type="text"
                  id="station_name"
                  class="set"
                  value={profileState.station_name}
                  disabled
                />
              </div>
              </div>

            <div class="mt-5 text-center"></div>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Drivers;

